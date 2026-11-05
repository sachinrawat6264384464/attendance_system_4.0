var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PrismaService_1;
import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
const NEON_DIRECT_URL = 'postgresql://neondb_owner:npg_BVX8kIyUqlO0@ep-cold-sky-b53itt32.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&connect_timeout=30&pool_timeout=60&connection_limit=20';
function formatDatabaseUrl(rawUrl, isCloud) {
    let url = rawUrl.trim();
    if (!isCloud && url.includes('-pooler')) {
        url = url.replace('-pooler', '');
        url = url.replace('&pgbouncer=true', '');
        url = url.replace('&statement_cache_size=0', '');
    }
    if (!url.includes('pool_timeout=')) {
        url += '&pool_timeout=60';
    }
    else {
        url = url.replace(/pool_timeout=\d+/, 'pool_timeout=60');
    }
    if (!url.includes('connection_limit=')) {
        url += '&connection_limit=20';
    }
    else {
        url = url.replace(/connection_limit=\d+/, 'connection_limit=20');
    }
    if (!url.includes('connect_timeout=')) {
        url += '&connect_timeout=30';
    }
    return url;
}
function resolveDatabaseUrl() {
    const isCloud = Boolean(process.env.VERCEL ||
        process.env.RENDER ||
        (process.env.NODE_ENV === 'production' && !process.env.LOCAL_DEV));
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
        }
        catch {
        }
    }
    const envUrl = process.env.DATABASE_URL;
    if (envUrl && !envUrl.includes('prisma.io')) {
        return formatDatabaseUrl(envUrl, isCloud);
    }
    return NEON_DIRECT_URL;
}
let PrismaService = PrismaService_1 = class PrismaService extends PrismaClient {
    logger = new Logger(PrismaService_1.name);
    keepAliveTimer = null;
    constructor() {
        const dbUrl = resolveDatabaseUrl();
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
            this.$on('error', (e) => {
                const msg = String(e?.message || '');
                if (msg.includes('10054') ||
                    msg.includes('ConnectionReset') ||
                    msg.includes('forcibly closed') ||
                    msg.includes("Can't reach database server") ||
                    msg.includes('Timed out fetching a new connection')) {
                    this.logger.debug('Neon serverless idle reconnect / cold-start auto-recovering.');
                    return;
                }
                this.logger.error(msg);
            });
            this.$on('warn', (e) => {
                this.logger.warn(String(e?.message || ''));
            });
            let connected = false;
            let attempts = 0;
            const maxAttempts = 3;
            while (!connected && attempts < maxAttempts) {
                attempts++;
                try {
                    await this.$connect();
                    connected = true;
                    this.logger.log('Successfully connected to Neon PostgreSQL database.');
                }
                catch (err) {
                    if (attempts >= maxAttempts) {
                        throw err;
                    }
                    this.logger.warn(`Neon database compute cold-start in progress (attempt ${attempts}/${maxAttempts}). Retrying in 2 seconds...`);
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                }
            }
            if (process.env.DISABLE_HEARTBEAT !== 'true') {
                this.keepAliveTimer = setInterval(async () => {
                    try {
                        await this.$queryRaw `SELECT 1`;
                    }
                    catch {
                        await this.$connect().catch(() => { });
                    }
                }, 30000);
                if (this.keepAliveTimer.unref) {
                    this.keepAliveTimer.unref();
                }
            }
        }
        catch (error) {
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
};
PrismaService = PrismaService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], PrismaService);
export { PrismaService };
//# sourceMappingURL=prisma.service.js.map