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
import { AssignmentsService } from './assignments.service.js';
import { CreateAssignmentDto, SubmitAssignmentDto, ReviewSubmissionDto, } from './dto/assignment.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser, AuthenticatedUser } from '../common/decorators/current-user.decorator.js';
let AssignmentsController = class AssignmentsController {
    assignmentsService;
    constructor(assignmentsService) {
        this.assignmentsService = assignmentsService;
    }
    createAssignment(user, dto) {
        if (!user.teacherProfileId) {
            throw new ForbiddenException('Teacher profile not found.');
        }
        return this.assignmentsService.createAssignment(user.teacherProfileId, dto);
    }
    getAssignments(user, classId, sectionId, subjectId) {
        const isStudent = user.roles.includes(RoleType.STUDENT);
        const isTeacher = user.roles.includes(RoleType.TEACHER);
        return this.assignmentsService.getAssignments(classId, sectionId, subjectId, isTeacher && !classId ? user.teacherProfileId : undefined, isStudent ? user.studentProfileId : undefined);
    }
    getAssignmentById(id, user) {
        const isStudent = user.roles.includes(RoleType.STUDENT);
        return this.assignmentsService.getAssignmentById(id, isStudent ? user.studentProfileId : undefined);
    }
    startAssignment(id, user) {
        if (!user.studentProfileId) {
            throw new ForbiddenException('Student profile not found.');
        }
        return this.assignmentsService.startAssignment(id, user.studentProfileId);
    }
    submitAssignment(id, user, dto) {
        if (!user.studentProfileId) {
            throw new ForbiddenException('Student profile not found.');
        }
        return this.assignmentsService.submitAssignment(id, user.studentProfileId, dto);
    }
    getAssignmentSubmissions(id, user) {
        if (!user.teacherProfileId) {
            throw new ForbiddenException('Teacher profile not found.');
        }
        return this.assignmentsService.getAssignmentSubmissions(id, user.teacherProfileId);
    }
    reviewSubmission(submissionId, user, dto) {
        if (!user.teacherProfileId) {
            throw new ForbiddenException('Teacher profile not found.');
        }
        return this.assignmentsService.reviewSubmission(submissionId, user.teacherProfileId, dto);
    }
};
__decorate([
    Post(),
    Roles(RoleType.TEACHER),
    ApiOperation({ summary: 'Create new coursework assignment with attachments' }),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthenticatedUser,
        CreateAssignmentDto]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "createAssignment", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'List assignments scoped to class, section, teacher or student' }),
    __param(0, CurrentUser()),
    __param(1, Query('classId')),
    __param(2, Query('sectionId')),
    __param(3, Query('subjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthenticatedUser, String, String, String]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "getAssignments", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Get assignment details, attachments, and personal submission' }),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, AuthenticatedUser]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "getAssignmentById", null);
__decorate([
    Patch(':id/start'),
    Roles(RoleType.STUDENT),
    ApiOperation({ summary: 'Mark assignment as STARTED' }),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, AuthenticatedUser]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "startAssignment", null);
__decorate([
    Post(':id/submit'),
    Roles(RoleType.STUDENT),
    ApiOperation({ summary: 'Submit assignment with notes or Cloudinary uploaded file' }),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, AuthenticatedUser,
        SubmitAssignmentDto]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "submitAssignment", null);
__decorate([
    Get(':id/submissions'),
    Roles(RoleType.TEACHER),
    ApiOperation({ summary: 'View all student submissions for an assignment' }),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, AuthenticatedUser]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "getAssignmentSubmissions", null);
__decorate([
    Post('submissions/:submissionId/review'),
    Roles(RoleType.TEACHER),
    ApiOperation({ summary: 'Review and grade student submission with feedback' }),
    __param(0, Param('submissionId')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, AuthenticatedUser,
        ReviewSubmissionDto]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "reviewSubmission", null);
AssignmentsController = __decorate([
    ApiTags('Assignments & Coursework'),
    Controller('assignments'),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    __metadata("design:paramtypes", [AssignmentsService])
], AssignmentsController);
export { AssignmentsController };
//# sourceMappingURL=assignments.controller.js.map