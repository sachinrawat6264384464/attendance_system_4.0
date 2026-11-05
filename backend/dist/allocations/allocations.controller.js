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
import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { AllocationsService } from './allocations.service.js';
import { CreateAllocationDto } from './dto/allocation.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
let AllocationsController = class AllocationsController {
    allocationsService;
    constructor(allocationsService) {
        this.allocationsService = allocationsService;
    }
    getAllocations(academicYearId, teacherId, classId, sectionId) {
        return this.allocationsService.getAllocations(academicYearId, teacherId, classId, sectionId);
    }
    createAllocation(dto) {
        return this.allocationsService.createAllocation(dto);
    }
    deleteAllocation(id) {
        return this.allocationsService.deleteAllocation(id);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'List teacher subject allocations' }),
    __param(0, Query('academicYearId')),
    __param(1, Query('teacherId')),
    __param(2, Query('classId')),
    __param(3, Query('sectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], AllocationsController.prototype, "getAllocations", null);
__decorate([
    Post(),
    Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR),
    ApiOperation({ summary: 'Allocate a teacher to a subject, class, and section' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAllocationDto]),
    __metadata("design:returntype", void 0)
], AllocationsController.prototype, "createAllocation", null);
__decorate([
    Delete(':id'),
    Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR),
    ApiOperation({ summary: 'Remove a teacher allocation' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AllocationsController.prototype, "deleteAllocation", null);
AllocationsController = __decorate([
    ApiTags('Teacher Allocations'),
    Controller('allocations'),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    __metadata("design:paramtypes", [AllocationsService])
], AllocationsController);
export { AllocationsController };
//# sourceMappingURL=allocations.controller.js.map