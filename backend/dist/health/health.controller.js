var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service.js';
let HealthController = class HealthController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkHealth() {
        let dbStatus = 'disconnected';
        try {
            await this.prisma.$queryRaw `SELECT 1`;
            dbStatus = 'connected';
        }
        catch {
            dbStatus = 'error';
        }
        const memoryUsage = process.memoryUsage();
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            database: dbStatus,
            uptimeSeconds: Math.floor(process.uptime()),
            memory: {
                rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
                heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
            },
        };
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'Liveness & readiness probe with database verification' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkHealth", null);
HealthController = __decorate([
    ApiTags('System Health'),
    Controller('health'),
    __metadata("design:paramtypes", [PrismaService])
], HealthController);
export { HealthController };
//# sourceMappingURL=health.controller.js.map