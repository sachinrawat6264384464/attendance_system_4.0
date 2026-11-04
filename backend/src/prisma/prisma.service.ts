import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private keepAliveTimer: NodeJS.Timeout | null = null;

  constructor() {
    const dbUrl = process.env.DATABASE_URL;
    super({
      datasources: dbUrl ? { db: { url: dbUrl } } : undefined,
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

