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
import { UsersService } from './users.service.js';
import { CreateTeacherDto, CreateStudentDto, BulkStudentImportDto } from './dto/users.dto.js';
import { PaginationDto } from '../common/dto/pagination.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    getTeachers(departmentId, pagination) {
        return this.usersService.getTeachers(departmentId, pagination);
    }
    createTeacher(dto) {
        return this.usersService.createTeacher(dto);
    }
    getStudents(classId, sectionId, academicYearId, search, pagination) {
        return this.usersService.getStudents(classId, sectionId, academicYearId, search, pagination);
    }
    createStudent(dto) {
        return this.usersService.createStudent(dto);
    }
    bulkImportStudents(dto) {
        return this.usersService.bulkImportStudents(dto);
    }
};
__decorate([
    Get('teachers'),
    Roles(RoleType.PRINCIPAL, RoleType.HOD, RoleType.COORDINATOR),
    ApiOperation({ summary: 'List teachers with departmental and allocation counts' }),
    __param(0, Query('departmentId')),
    __param(1, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, PaginationDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getTeachers", null);
__decorate([
    Post('teachers'),
    Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR),
    ApiOperation({ summary: 'Register a new teacher and create employee profile' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTeacherDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createTeacher", null);
__decorate([
    Get('students'),
    Roles(RoleType.PRINCIPAL, RoleType.HOD, RoleType.COORDINATOR, RoleType.TEACHER),
    ApiOperation({ summary: 'List students with class, section, and search filters' }),
    __param(0, Query('classId')),
    __param(1, Query('sectionId')),
    __param(2, Query('academicYearId')),
    __param(3, Query('search')),
    __param(4, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, PaginationDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getStudents", null);
__decorate([
    Post('students'),
    Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR),
    ApiOperation({ summary: 'Register a new student and enroll into class/section' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateStudentDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createStudent", null);
__decorate([
    Post('students/bulk'),
    Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR),
    ApiOperation({ summary: 'Bulk import students roster' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BulkStudentImportDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "bulkImportStudents", null);
UsersController = __decorate([
    ApiTags('User & Roster Management'),
    Controller('users'),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    __metadata("design:paramtypes", [UsersService])
], UsersController);
export { UsersController };
//# sourceMappingURL=users.controller.js.map