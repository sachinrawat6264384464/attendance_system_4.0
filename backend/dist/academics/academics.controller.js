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
import { Controller, Get, Post, Body, Query, UseGuards, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { AcademicsService } from './academics.service.js';
import { CreateAcademicYearDto, CreateClassDto, CreateSectionDto, CreateSubjectDto, CreateDepartmentDto, } from './dto/academics.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
let AcademicsController = class AcademicsController {
    academicsService;
    constructor(academicsService) {
        this.academicsService = academicsService;
    }
    getAcademicYears() {
        return this.academicsService.getAcademicYears();
    }
    getCurrentYear() {
        return this.academicsService.getCurrentAcademicYear();
    }
    createAcademicYear(dto) {
        return this.academicsService.createAcademicYear(dto);
    }
    getDepartments() {
        return this.academicsService.getDepartments();
    }
    createDepartment(dto) {
        return this.academicsService.createDepartment(dto);
    }
    getClasses() {
        return this.academicsService.getClasses();
    }
    createClass(dto) {
        return this.academicsService.createClass(dto);
    }
    createSection(dto) {
        return this.academicsService.createSection(dto);
    }
    getSubjects(departmentId) {
        return this.academicsService.getSubjects(departmentId);
    }
    createSubject(dto) {
        return this.academicsService.createSubject(dto);
    }
};
__decorate([
    Get('years'),
    ApiOperation({ summary: 'List all academic years' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AcademicsController.prototype, "getAcademicYears", null);
__decorate([
    Get('years/current'),
    ApiOperation({ summary: 'Get current active academic year' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AcademicsController.prototype, "getCurrentYear", null);
__decorate([
    Post('years'),
    Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR),
    ApiOperation({ summary: 'Create new academic year calendar' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAcademicYearDto]),
    __metadata("design:returntype", void 0)
], AcademicsController.prototype, "createAcademicYear", null);
__decorate([
    Get('departments'),
    ApiOperation({ summary: 'List academic departments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AcademicsController.prototype, "getDepartments", null);
__decorate([
    Post('departments'),
    Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR),
    ApiOperation({ summary: 'Create academic department' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateDepartmentDto]),
    __metadata("design:returntype", void 0)
], AcademicsController.prototype, "createDepartment", null);
__decorate([
    Get('classes'),
    ApiOperation({ summary: 'List all classes and their sections' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AcademicsController.prototype, "getClasses", null);
__decorate([
    Post('classes'),
    Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR),
    ApiOperation({ summary: 'Create new class grade level' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateClassDto]),
    __metadata("design:returntype", void 0)
], AcademicsController.prototype, "createClass", null);
__decorate([
    Post('sections'),
    Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR),
    ApiOperation({ summary: 'Create new section for a class' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSectionDto]),
    __metadata("design:returntype", void 0)
], AcademicsController.prototype, "createSection", null);
__decorate([
    Get('subjects'),
    ApiOperation({ summary: 'List subjects, optionally filtered by department' }),
    __param(0, Query('departmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcademicsController.prototype, "getSubjects", null);
__decorate([
    Post('subjects'),
    Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR),
    ApiOperation({ summary: 'Create new subject' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSubjectDto]),
    __metadata("design:returntype", void 0)
], AcademicsController.prototype, "createSubject", null);
AcademicsController = __decorate([
    ApiTags('Academic Structure'),
    Controller('academics'),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    __metadata("design:paramtypes", [AcademicsService])
], AcademicsController);
export { AcademicsController };
//# sourceMappingURL=academics.controller.js.map