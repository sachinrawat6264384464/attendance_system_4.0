import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env'],
    }),
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
  providers: [],
})
export class AppModule {}
