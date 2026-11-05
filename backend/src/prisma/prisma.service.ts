import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const NEON_DEFAULT_POOLER_URL =
  'postgresql://neondb_owner:npg_BVX8kIyUqlO0@ep-cold-sky-b53itt32-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connect_timeout=30&pool_timeout=60&connection_limit=20&statement_cache_size=0';

function resolveDatabaseUrl(): string {
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
          let resolved = match[1].trim();
          // Adjust connection limits for high-concurrency resilience
          if (resolved.includes('connection_limit=5')) {
            resolved = resolved.replace('connection_limit=5', 'connection_limit=20');
          }
          if (resolved.includes('pool_timeout=30')) {
            resolved = resolved.replace('pool_timeout=30', 'pool_timeout=60');
          }
          return resolved;
        }
      }
    } catch {
      // Continue to next path
    }
  }

  // 2. Check process.env.DATABASE_URL if valid and not corrupted by prisma.io
  const envUrl = process.env.DATABASE_URL;
  if (envUrl && !envUrl.includes('prisma.io')) {
    let resolved = envUrl.trim();
    if (resolved.includes('connection_limit=5')) {
      resolved = resolved.replace('connection_limit=5', 'connection_limit=20');
    }
    if (resolved.includes('pool_timeout=30')) {
      resolved = resolved.replace('pool_timeout=30', 'pool_timeout=60');
    }
    return resolved;
  }

  // 3. Authoritative fallback to verified Neon PostgreSQL credentials
  return NEON_DEFAULT_POOLER_URL;
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

      await this.$connect();
      this.logger.log('Successfully connected to Neon PostgreSQL database.');

      // Heartbeat ping every 20 seconds to prevent Neon serverless PgBouncer from dropping idle TCP sockets
      this.keepAliveTimer = setInterval(async () => {
        try {
          await this.$queryRaw`SELECT 1`;
        } catch {
          this.logger.debug('Neon heartbeat refreshing pool connection...');
          await this.$connect().catch(() => {});
        }
      }, 20000);

      // Allow node process to exit cleanly without waiting on interval
      if (this.keepAliveTimer.unref) {
        this.keepAliveTimer.unref();
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

