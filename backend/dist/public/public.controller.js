var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { PublicService } from './public.service.js';
import { CreateAdmissionEnquiryDto } from './dto/public.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
let PublicController = class PublicController {
    publicService;
    constructor(publicService) {
        this.publicService = publicService;
    }
    getSchoolInfo() {
        return this.publicService.getSchoolInfo();
    }
    getFacultyDirectory() {
        return this.publicService.getFacultyDirectory();
    }
    submitAdmissionEnquiry(dto) {
        return this.publicService.submitAdmissionEnquiry(dto);
    }
    getAdmissionEnquiries() {
        return this.publicService.getAdmissionEnquiries();
    }
    updateSchoolInfo(dto) {
        return this.publicService.updateSchoolInfo(dto);
    }
    updateAdmissionStatus(id, status) {
        return this.publicService.updateAdmissionStatus(id, status);
    }
};
__decorate([
    Get('school-info'),
    ApiOperation({ summary: 'Get public school profile, contact information, and affiliation' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "getSchoolInfo", null);
__decorate([
    Get('faculty-directory'),
    ApiOperation({ summary: 'Get public listing of teachers and academic departments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "getFacultyDirectory", null);
__decorate([
    Post('admission-enquiry'),
    ApiOperation({ summary: 'Submit an online admission enquiry' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAdmissionEnquiryDto]),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "submitAdmissionEnquiry", null);
__decorate([
    Get('admissions'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR),
    ApiBearerAuth(),
    ApiOperation({ summary: 'List submitted admission enquiries' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "getAdmissionEnquiries", null);
__decorate([
    Patch('school-info'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(RoleType.PRINCIPAL),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update public school profile, address, and contacts (Principal only)' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "updateSchoolInfo", null);
__decorate([
    Patch('admissions/:id/status'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update admission enquiry status (Principal or Coordinator)' }),
    __param(0, Param('id')),
    __param(1, Body('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "updateAdmissionStatus", null);
PublicController = __decorate([
    ApiTags('Public Website & Admissions'),
    Controller('public'),
    __metadata("design:paramtypes", [PublicService])
], PublicController);
export { PublicController };
//# sourceMappingURL=public.controller.js.map