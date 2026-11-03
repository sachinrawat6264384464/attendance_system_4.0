import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { UsersService } from './users.service.js';
import { CreateTeacherDto, CreateStudentDto, BulkStudentImportDto } from './dto/users.dto.js';
import { PaginationDto } from '../common/dto/pagination.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@ApiTags('User & Roster Management')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ---------------- TEACHERS ----------------
  @Get('teachers')
  @Roles(RoleType.PRINCIPAL, RoleType.HOD, RoleType.COORDINATOR)
  @ApiOperation({ summary: 'List teachers with departmental and allocation counts' })
  getTeachers(
    @Query('departmentId') departmentId?: string,
    @Query() pagination?: PaginationDto,
  ) {
    return this.usersService.getTeachers(departmentId, pagination);
  }

  @Post('teachers')
  @Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR)
  @ApiOperation({ summary: 'Register a new teacher and create employee profile' })
  createTeacher(@Body() dto: CreateTeacherDto) {
    return this.usersService.createTeacher(dto);
  }

  // ---------------- STUDENTS ----------------
  @Get('students')
  @Roles(RoleType.PRINCIPAL, RoleType.HOD, RoleType.COORDINATOR, RoleType.TEACHER)
  @ApiOperation({ summary: 'List students with class, section, and search filters' })
  getStudents(
    @Query('classId') classId?: string,
    @Query('sectionId') sectionId?: string,
    @Query('academicYearId') academicYearId?: string,
    @Query('search') search?: string,
    @Query() pagination?: PaginationDto,
  ) {
    return this.usersService.getStudents(classId, sectionId, academicYearId, search, pagination);
  }

  @Post('students')
  @Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR)
  @ApiOperation({ summary: 'Register a new student and enroll into class/section' })
  createStudent(@Body() dto: CreateStudentDto) {
    return this.usersService.createStudent(dto);
  }

  @Post('students/bulk')
  @Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR)
  @ApiOperation({ summary: 'Bulk import students roster' })
  bulkImportStudents(@Body() dto: BulkStudentImportDto) {
    return this.usersService.bulkImportStudents(dto);
  }
}

