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
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to Neon PostgreSQL database.');

      // Start keep-alive ping every 45 seconds to keep Neon compute & PgBouncer socket active
      this.keepAliveTimer = setInterval(async () => {
        try {
          await this.$queryRaw`SELECT 1`;
        } catch {
          this.logger.debug('Neon socket reset detected, reconnecting pool...');
          await this.$connect().catch(() => {});
        }
      }, 45000);

      // Allow node to exit cleanly without waiting on interval
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

