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
import { AcademicsService } from './academics.service.js';
import {
  CreateAcademicYearDto,
  CreateClassDto,
  CreateSectionDto,
  CreateSubjectDto,
  CreateDepartmentDto,
} from './dto/academics.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@ApiTags('Academic Structure')
@Controller('academics')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AcademicsController {
  constructor(private readonly academicsService: AcademicsService) {}

  // Academic Years
  @Get('years')
  @ApiOperation({ summary: 'List all academic years' })
  getAcademicYears() {
    return this.academicsService.getAcademicYears();
  }

  @Get('years/current')
  @ApiOperation({ summary: 'Get current active academic year' })
  getCurrentYear() {
    return this.academicsService.getCurrentAcademicYear();
  }

  @Post('years')
  @Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR)
  @ApiOperation({ summary: 'Create new academic year calendar' })
  createAcademicYear(@Body() dto: CreateAcademicYearDto) {
    return this.academicsService.createAcademicYear(dto);
  }

  // Departments
  @Get('departments')
  @ApiOperation({ summary: 'List academic departments' })
  getDepartments() {
    return this.academicsService.getDepartments();
  }

  @Post('departments')
  @Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR)
  @ApiOperation({ summary: 'Create academic department' })
  createDepartment(@Body() dto: CreateDepartmentDto) {
    return this.academicsService.createDepartment(dto);
  }

  // Classes & Sections
  @Get('classes')
  @ApiOperation({ summary: 'List all classes and their sections' })
  getClasses() {
    return this.academicsService.getClasses();
  }

  @Post('classes')
  @Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR)
  @ApiOperation({ summary: 'Create new class grade level' })
  createClass(@Body() dto: CreateClassDto) {
    return this.academicsService.createClass(dto);
  }

  @Post('sections')
  @Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR)
  @ApiOperation({ summary: 'Create new section for a class' })
  createSection(@Body() dto: CreateSectionDto) {
    return this.academicsService.createSection(dto);
  }

  // Subjects
  @Get('subjects')
  @ApiOperation({ summary: 'List subjects, optionally filtered by department' })
  getSubjects(@Query('departmentId') departmentId?: string) {
    return this.academicsService.getSubjects(departmentId);
  }

  @Post('subjects')
  @Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR)
  @ApiOperation({ summary: 'Create new subject' })
  createSubject(@Body() dto: CreateSubjectDto) {
    return this.academicsService.createSubject(dto);
  }
}

