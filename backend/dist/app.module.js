var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { AcademicsModule } from './academics/academics.module.js';
import { UsersModule } from './users/users.module.js';
import { AllocationsModule } from './allocations/allocations.module.js';
import { TimetableModule } from './timetable/timetable.module.js';
import { AttendanceModule } from './attendance/attendance.module.js';
import { AssignmentsModule } from './assignments/assignments.module.js';
import { FilesModule } from './files/files.module.js';
import { PublicModule } from './public/public.module.js';
import { ReportsModule } from './reports/reports.module.js';
import { HealthModule } from './health/health.module.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env', '../.env'],
            }),
            ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 120,
                },
            ]),
            PrismaModule,
            AuthModule,
            AcademicsModule,
            UsersModule,
            AllocationsModule,
            TimetableModule,
            AttendanceModule,
            AssignmentsModule,
            FilesModule,
            PublicModule,
            ReportsModule,
            HealthModule,
        ],
        providers: [
            {
                provide: APP_GUARD,
                useClass: ThrottlerGuard,
            },
        ],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map