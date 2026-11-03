import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { PublicService } from './public.service.js';
import { CreateAdmissionEnquiryDto } from './dto/public.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@ApiTags('Public Website & Admissions')
@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('school-info')
  @ApiOperation({ summary: 'Get public school profile, contact information, and affiliation' })
  getSchoolInfo() {
    return this.publicService.getSchoolInfo();
  }

  @Get('faculty-directory')
  @ApiOperation({ summary: 'Get public listing of teachers and academic departments' })
  getFacultyDirectory() {
    return this.publicService.getFacultyDirectory();
  }

  @Post('admission-enquiry')
  @ApiOperation({ summary: 'Submit an online admission enquiry' })
  submitAdmissionEnquiry(@Body() dto: CreateAdmissionEnquiryDto) {
    return this.publicService.submitAdmissionEnquiry(dto);
  }

  @Get('admissions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List submitted admission enquiries' })
  getAdmissionEnquiries() {
    return this.publicService.getAdmissionEnquiries();
  }
}

