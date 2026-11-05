import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
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

  @Patch('school-info')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.PRINCIPAL)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update public school profile, address, and contacts (Principal only)' })
  updateSchoolInfo(@Body() dto: any) {
    return this.publicService.updateSchoolInfo(dto);
  }

  @Patch('admissions/:id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update admission enquiry status (Principal or Coordinator)' })
  updateAdmissionStatus(@Param('id') id: string, @Body('status') status: any) {
    return this.publicService.updateAdmissionStatus(id, status);
  }
}

