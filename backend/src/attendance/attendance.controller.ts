import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { AttendanceService } from './attendance.service.js';
import {
  SubmitAttendanceDto,
  RequestCorrectionDto,
  ReviewCorrectionDto,
} from './dto/attendance.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser, AuthenticatedUser } from '../common/decorators/current-user.decorator.js';

@ApiTags('Attendance Engine')
@Controller('attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('submit')
  @Roles(RoleType.TEACHER)
  @ApiOperation({ summary: 'Submit and finalize period attendance for a class & section' })
  submitAttendance(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: SubmitAttendanceDto,
  ) {
    if (!user.teacherProfileId) {
      throw new ForbiddenException('Teacher profile not found.');
    }
    return this.attendanceService.submitAttendance(user.teacherProfileId, dto);
  }

  @Get('sessions')
  @Roles(RoleType.PRINCIPAL, RoleType.HOD, RoleType.COORDINATOR, RoleType.TEACHER)
  @ApiOperation({ summary: 'List attendance sessions filtered by class, section, date' })
  getSessions(
    @Query('classId') classId?: string,
    @Query('sectionId') sectionId?: string,
    @Query('date') date?: string,
    @Query('academicYearId') academicYearId?: string,
  ) {
    return this.attendanceService.getSessions(classId, sectionId, date, undefined, academicYearId);
  }

  @Get('session/:id')
  @Roles(RoleType.PRINCIPAL, RoleType.HOD, RoleType.COORDINATOR, RoleType.TEACHER)
  @ApiOperation({ summary: 'Get student records for a specific attendance session' })
  getSession(@Param('id') id: string) {
    return this.attendanceService.getSession(id);
  }

  @Post('corrections')
  @Roles(RoleType.TEACHER)
  @ApiOperation({ summary: 'Request correction for a finalized attendance record' })
  requestCorrection(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: RequestCorrectionDto,
  ) {
    return this.attendanceService.requestCorrection(user.userId, dto);
  }

  @Get('corrections/pending')
  @Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR)
  @ApiOperation({ summary: 'List all pending attendance correction requests' })
  getPendingCorrections() {
    return this.attendanceService.getPendingCorrections();
  }

  @Patch('corrections/:id/review')
  @Roles(RoleType.PRINCIPAL)
  @ApiOperation({ summary: 'Approve or reject attendance correction (generates audit log)' })
  reviewCorrection(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: ReviewCorrectionDto,
  ) {
    return this.attendanceService.reviewCorrection(user.userId, id, dto);
  }

  @Get('student/my-summary')
  @Roles(RoleType.STUDENT)
  @ApiOperation({ summary: 'Get current student attendance percentage & subject breakdown' })
  getMySummary(
    @CurrentUser() user: AuthenticatedUser,
    @Query('academicYearId') academicYearId?: string,
  ) {
    if (!user.studentProfileId) {
      throw new ForbiddenException('Student profile not found.');
    }
    return this.attendanceService.getStudentAttendanceSummary(user.studentProfileId, academicYearId);
  }

  @Get('reports/class')
  @Roles(RoleType.PRINCIPAL, RoleType.HOD, RoleType.COORDINATOR)
  @ApiOperation({ summary: 'Get aggregated attendance report for class and date range' })
  getClassReport(
    @Query('classId') classId: string,
    @Query('sectionId') sectionId: string,
    @Query('academicYearId') academicYearId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.attendanceService.getClassAttendanceReport(
      classId,
      sectionId,
      academicYearId,
      startDate,
      endDate,
    );
  }
}

