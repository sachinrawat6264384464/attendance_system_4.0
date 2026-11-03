import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { TimetableService } from './timetable.service.js';
import { CreateTimetableSlotDto } from './dto/timetable.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser, AuthenticatedUser } from '../common/decorators/current-user.decorator.js';

@ApiTags('Timetable & Bell Schedule')
@Controller('timetable')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Post('slots')
  @Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR)
  @ApiOperation({ summary: 'Create a timetable period slot with conflict checking' })
  createSlot(@Body() dto: CreateTimetableSlotDto) {
    return this.timetableService.createSlot(dto);
  }

  @Get('section')
  @ApiOperation({ summary: 'Get weekly timetable for a specific class and section' })
  getSectionTimetable(
    @Query('classId') classId: string,
    @Query('sectionId') sectionId: string,
    @Query('academicYearId') academicYearId?: string,
  ) {
    return this.timetableService.getSectionTimetable(classId, sectionId, academicYearId);
  }

  @Get('teacher/my-schedule')
  @Roles(RoleType.TEACHER)
  @ApiOperation({ summary: 'Get logged-in teacher schedule' })
  getMySchedule(
    @CurrentUser() user: AuthenticatedUser,
    @Query('academicYearId') academicYearId?: string,
  ) {
    if (!user.teacherProfileId) {
      throw new ForbiddenException('Teacher profile not found.');
    }
    return this.timetableService.getTeacherSchedule(user.teacherProfileId, academicYearId);
  }

  @Get('student/my-schedule')
  @Roles(RoleType.STUDENT)
  @ApiOperation({ summary: 'Get logged-in student class timetable' })
  getStudentSchedule(
    @CurrentUser() user: AuthenticatedUser,
    @Query('academicYearId') academicYearId?: string,
  ) {
    if (!user.studentProfileId) {
      throw new ForbiddenException('Student profile not found.');
    }
    return this.timetableService.getStudentSchedule(user.studentProfileId, academicYearId);
  }

  @Delete('slots/:id')
  @Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR)
  @ApiOperation({ summary: 'Delete a timetable slot' })
  deleteSlot(@Param('id') id: string) {
    return this.timetableService.deleteSlot(id);
  }
}

