import { Controller, Get, UseGuards, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { ReportsService } from './reports.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser, AuthenticatedUser } from '../common/decorators/current-user.decorator.js';

@ApiTags('Analytics & Dashboards')
@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('dashboard/principal')
  @Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR)
  @ApiOperation({ summary: 'Get school-wide executive KPIs for Principal dashboard' })
  getPrincipalDashboard() {
    return this.reportsService.getPrincipalDashboard();
  }

  @Get('dashboard/hod')
  @Roles(RoleType.HOD)
  @ApiOperation({ summary: 'Get departmental metrics for HOD dashboard' })
  getHodDashboard(@CurrentUser() user: any) {
    if (!user.departmentId) {
      throw new ForbiddenException('User is not assigned to any academic department.');
    }
    return this.reportsService.getHodDashboard(user.departmentId);
  }
}

