import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const NEON_DIRECT_URL =
  'postgresql://neondb_owner:npg_BVX8kIyUqlO0@ep-cold-sky-b53itt32.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&connect_timeout=30&pool_timeout=60&connection_limit=20';

function formatDatabaseUrl(rawUrl: string, isCloud: boolean): string {
  let url = rawUrl.trim();
  // Strip -pooler on local dev to prevent ISP packet drops
  if (!isCloud && url.includes('-pooler')) {
    url = url.replace('-pooler', '');
    url = url.replace('&pgbouncer=true', '');
    url = url.replace('&statement_cache_size=0', '');
  }
  // Enforce pool timeouts so Neon compute cold-starts never fail at 10 seconds
  if (!url.includes('pool_timeout=')) {
    url += '&pool_timeout=60';
  } else {
    url = url.replace(/pool_timeout=\d+/, 'pool_timeout=60');
  }
  if (!url.includes('connection_limit=')) {
    url += '&connection_limit=20';
  } else {
    url = url.replace(/connection_limit=\d+/, 'connection_limit=20');
  }
  if (!url.includes('connect_timeout=')) {
    url += '&connect_timeout=30';
  }
  return url;
}

function resolveDatabaseUrl(): string {
  const isCloud = Boolean(
    process.env.VERCEL ||
    process.env.RENDER ||
    (process.env.NODE_ENV === 'production' && !process.env.LOCAL_DEV)
  );

  // 1. First check local .env files to override any stale OS-level environment variables (like prisma.io)
  const candidatePaths = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), 'backend/.env'),
    path.resolve(process.cwd(), '../.env'),
  ];

  for (const envPath of candidatePaths) {
    try {
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf-8');
        const match = content.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
        if (match && match[1] && !match[1].includes('prisma.io')) {
          return formatDatabaseUrl(match[1], isCloud);
        }
      }
    } catch {
      // Continue to next path
    }
  }

  // 2. Check process.env.DATABASE_URL if valid and not corrupted by prisma.io
  const envUrl = process.env.DATABASE_URL;
  if (envUrl && !envUrl.includes('prisma.io')) {
    return formatDatabaseUrl(envUrl, isCloud);
  }

  // 3. Authoritative fallback to verified Neon PostgreSQL direct credentials
  return NEON_DIRECT_URL;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private keepAliveTimer: NodeJS.Timeout | null = null;

  constructor() {
    const dbUrl = resolveDatabaseUrl();
    // Synchronize process.env so any external Prisma helper also picks up the correct URL
    process.env.DATABASE_URL = dbUrl;

    super({
      datasources: { db: { url: dbUrl } },
      log: [
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
      ],
    });
  }

  async onModuleInit() {
    try {
      // Intercept and handle socket reset events cleanly so remote serverless idle drops don't print raw errors
      (this as any).$on('error', (e: any) => {
        const msg = String(e?.message || '');
        if (msg.includes('10054') || msg.includes('ConnectionReset') || msg.includes('forcibly closed')) {
          this.logger.debug('Neon serverless idle connection reset by remote host; connection pool auto-recovered.');
          return;
        }
        this.logger.error(msg);
      });

      (this as any).$on('warn', (e: any) => {
        this.logger.warn(String(e?.message || ''));
      });

      // Connect with automatic retry for Neon serverless cold-starts
      let connected = false;
      let attempts = 0;
      const maxAttempts = 3;

      while (!connected && attempts < maxAttempts) {
        attempts++;
        try {
          await this.$connect();
          connected = true;
          this.logger.log('Successfully connected to Neon PostgreSQL database.');
        } catch (err: any) {
          if (attempts >= maxAttempts) {
            throw err;
          }
          this.logger.warn(
            `Neon database compute cold-start in progress (attempt ${attempts}/${maxAttempts}). Retrying in 2 seconds...`,
          );
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }

      // Heartbeat ping every 30 seconds to prevent Neon serverless from dropping idle TCP sockets
      if (process.env.DISABLE_HEARTBEAT !== 'true') {
        this.keepAliveTimer = setInterval(async () => {
          try {
            await this.$queryRaw`SELECT 1`;
          } catch {
            await this.$connect().catch(() => {});
          }
        }, 30000);

        if (this.keepAliveTimer.unref) {
          this.keepAliveTimer.unref();
        }
      }
    } catch (error) {
      this.logger.error('Failed to connect to database during initialization:', error);
    }
  }

  async onModuleDestroy() {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
    await this.$disconnect();
    this.logger.log('Prisma disconnected from database.');
  }
}

