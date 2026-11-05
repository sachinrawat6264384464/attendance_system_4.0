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
import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards, ForbiddenException, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { AttendanceService } from './attendance.service.js';
import { SubmitAttendanceDto, RequestCorrectionDto, ReviewCorrectionDto, } from './dto/attendance.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser, AuthenticatedUser } from '../common/decorators/current-user.decorator.js';
let AttendanceController = class AttendanceController {
    attendanceService;
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    submitAttendance(user, dto) {
        if (!user.teacherProfileId) {
            throw new ForbiddenException('Teacher profile not found.');
        }
        return this.attendanceService.submitAttendance(user.teacherProfileId, dto);
    }
    getSessions(classId, sectionId, date, academicYearId) {
        return this.attendanceService.getSessions(classId, sectionId, date, undefined, academicYearId);
    }
    getSession(id) {
        return this.attendanceService.getSession(id);
    }
    requestCorrection(user, dto) {
        return this.attendanceService.requestCorrection(user.userId, dto);
    }
    getPendingCorrections() {
        return this.attendanceService.getPendingCorrections();
    }
    reviewCorrection(user, id, dto) {
        return this.attendanceService.reviewCorrection(user.userId, id, dto);
    }
    getMySummary(user, academicYearId) {
        if (!user.studentProfileId) {
            throw new ForbiddenException('Student profile not found.');
        }
        return this.attendanceService.getStudentAttendanceSummary(user.studentProfileId, academicYearId);
    }
    getClassReport(classId, sectionId, academicYearId, startDate, endDate) {
        return this.attendanceService.getClassAttendanceReport(classId, sectionId, academicYearId, startDate, endDate);
    }
};
__decorate([
    Post('submit'),
    Roles(RoleType.TEACHER),
    ApiOperation({ summary: 'Submit and finalize period attendance for a class & section' }),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthenticatedUser,
        SubmitAttendanceDto]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "submitAttendance", null);
__decorate([
    Get('sessions'),
    Roles(RoleType.PRINCIPAL, RoleType.HOD, RoleType.COORDINATOR, RoleType.TEACHER),
    ApiOperation({ summary: 'List attendance sessions filtered by class, section, date' }),
    __param(0, Query('classId')),
    __param(1, Query('sectionId')),
    __param(2, Query('date')),
    __param(3, Query('academicYearId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getSessions", null);
__decorate([
    Get('session/:id'),
    Roles(RoleType.PRINCIPAL, RoleType.HOD, RoleType.COORDINATOR, RoleType.TEACHER),
    ApiOperation({ summary: 'Get student records for a specific attendance session' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getSession", null);
__decorate([
    Post('corrections'),
    Roles(RoleType.TEACHER),
    ApiOperation({ summary: 'Request correction for a finalized attendance record' }),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthenticatedUser,
        RequestCorrectionDto]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "requestCorrection", null);
__decorate([
    Get('corrections/pending'),
    Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR),
    ApiOperation({ summary: 'List all pending attendance correction requests' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getPendingCorrections", null);
__decorate([
    Patch('corrections/:id/review'),
    Roles(RoleType.PRINCIPAL),
    ApiOperation({ summary: 'Approve or reject attendance correction (generates audit log)' }),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthenticatedUser, String, ReviewCorrectionDto]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "reviewCorrection", null);
__decorate([
    Get('student/my-summary'),
    Roles(RoleType.STUDENT),
    ApiOperation({ summary: 'Get current student attendance percentage & subject breakdown' }),
    __param(0, CurrentUser()),
    __param(1, Query('academicYearId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthenticatedUser, String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getMySummary", null);
__decorate([
    Get('reports/class'),
    Roles(RoleType.PRINCIPAL, RoleType.HOD, RoleType.COORDINATOR),
    ApiOperation({ summary: 'Get aggregated attendance report for class and date range' }),
    __param(0, Query('classId')),
    __param(1, Query('sectionId')),
    __param(2, Query('academicYearId')),
    __param(3, Query('startDate')),
    __param(4, Query('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getClassReport", null);
AttendanceController = __decorate([
    ApiTags('Attendance Engine'),
    Controller('attendance'),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    __metadata("design:paramtypes", [AttendanceService])
], AttendanceController);
export { AttendanceController };
//# sourceMappingURL=attendance.controller.js.map