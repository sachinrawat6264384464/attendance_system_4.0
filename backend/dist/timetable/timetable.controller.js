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
import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards, ForbiddenException, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { TimetableService } from './timetable.service.js';
import { CreateTimetableSlotDto } from './dto/timetable.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser, AuthenticatedUser } from '../common/decorators/current-user.decorator.js';
let TimetableController = class TimetableController {
    timetableService;
    constructor(timetableService) {
        this.timetableService = timetableService;
    }
    createSlot(dto) {
        return this.timetableService.createSlot(dto);
    }
    getSectionTimetable(classId, sectionId, academicYearId) {
        return this.timetableService.getSectionTimetable(classId, sectionId, academicYearId);
    }
    getMySchedule(user, academicYearId) {
        if (!user.teacherProfileId) {
            throw new ForbiddenException('Teacher profile not found.');
        }
        return this.timetableService.getTeacherSchedule(user.teacherProfileId, academicYearId);
    }
    getStudentSchedule(user, academicYearId) {
        if (!user.studentProfileId) {
            throw new ForbiddenException('Student profile not found.');
        }
        return this.timetableService.getStudentSchedule(user.studentProfileId, academicYearId);
    }
    deleteSlot(id) {
        return this.timetableService.deleteSlot(id);
    }
};
__decorate([
    Post('slots'),
    Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR),
    ApiOperation({ summary: 'Create a timetable period slot with conflict checking' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTimetableSlotDto]),
    __metadata("design:returntype", void 0)
], TimetableController.prototype, "createSlot", null);
__decorate([
    Get('section'),
    ApiOperation({ summary: 'Get weekly timetable for a specific class and section' }),
    __param(0, Query('classId')),
    __param(1, Query('sectionId')),
    __param(2, Query('academicYearId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], TimetableController.prototype, "getSectionTimetable", null);
__decorate([
    Get('teacher/my-schedule'),
    Roles(RoleType.TEACHER),
    ApiOperation({ summary: 'Get logged-in teacher schedule' }),
    __param(0, CurrentUser()),
    __param(1, Query('academicYearId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthenticatedUser, String]),
    __metadata("design:returntype", void 0)
], TimetableController.prototype, "getMySchedule", null);
__decorate([
    Get('student/my-schedule'),
    Roles(RoleType.STUDENT),
    ApiOperation({ summary: 'Get logged-in student class timetable' }),
    __param(0, CurrentUser()),
    __param(1, Query('academicYearId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthenticatedUser, String]),
    __metadata("design:returntype", void 0)
], TimetableController.prototype, "getStudentSchedule", null);
__decorate([
    Delete('slots/:id'),
    Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR),
    ApiOperation({ summary: 'Delete a timetable slot' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TimetableController.prototype, "deleteSlot", null);
TimetableController = __decorate([
    ApiTags('Timetable & Bell Schedule'),
    Controller('timetable'),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    __metadata("design:paramtypes", [TimetableService])
], TimetableController);
export { TimetableController };
//# sourceMappingURL=timetable.controller.js.map