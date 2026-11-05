var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let AllocationsService = class AllocationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAllocation(dto) {
        const existing = await this.prisma.teacherAllocation.findUnique({
            where: {
                academicYearId_teacherId_subjectId_classId_sectionId: {
                    academicYearId: dto.academicYearId,
                    teacherId: dto.teacherId,
                    subjectId: dto.subjectId,
                    classId: dto.classId,
                    sectionId: dto.sectionId,
                },
            },
        });
        if (existing) {
            throw new ConflictException('This teacher allocation already exists.');
        }
        return this.prisma.teacherAllocation.create({
            data: dto,
            include: {
                teacher: { include: { user: { select: { firstName: true, lastName: true, email: true } } } },
                subject: true,
                class: true,
                section: true,
            },
        });
    }
    async getAllocations(academicYearId, teacherId, classId, sectionId) {
        return this.prisma.teacherAllocation.findMany({
            where: {
                academicYearId,
                teacherId,
                classId,
                sectionId,
            },
            include: {
                teacher: { include: { user: { select: { firstName: true, lastName: true, email: true } } } },
                subject: true,
                class: true,
                section: true,
            },
            orderBy: [{ class: { numericOrder: 'asc' } }, { section: { name: 'asc' } }],
        });
    }
    async deleteAllocation(id) {
        const alloc = await this.prisma.teacherAllocation.findUnique({ where: { id } });
        if (!alloc) {
            throw new NotFoundException('Allocation not found.');
        }
        return this.prisma.teacherAllocation.delete({ where: { id } });
    }
};
AllocationsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AllocationsService);
export { AllocationsService };
//# sourceMappingURL=allocations.service.js.map