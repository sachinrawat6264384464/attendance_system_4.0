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

      // Start keep-alive ping every 2 minutes in development to prevent Neon serverless scale-to-zero idle drops
      if (process.env.NODE_ENV === 'development') {
        this.keepAliveTimer = setInterval(async () => {
          try {
            await this.$queryRaw`SELECT 1`;
          } catch (pingError: any) {
            this.logger.debug('Neon keep-alive ping reconnecting...');
          }
        }, 120000); // 2 minutes
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

