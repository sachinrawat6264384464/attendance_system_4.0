var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let AcademicsService = class AcademicsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAcademicYears() {
        return this.prisma.academicYear.findMany({
            orderBy: { startDate: 'desc' },
            include: {
                semesters: true,
            },
        });
    }
    async getCurrentAcademicYear() {
        return this.prisma.academicYear.findFirst({
            where: { isCurrent: true },
            include: { semesters: true },
        });
    }
    async createAcademicYear(dto) {
        const existing = await this.prisma.academicYear.findUnique({
            where: { name: dto.name },
        });
        if (existing) {
            throw new ConflictException(`Academic year ${dto.name} already exists.`);
        }
        if (dto.isCurrent) {
            await this.prisma.academicYear.updateMany({
                where: { isCurrent: true },
                data: { isCurrent: false },
            });
        }
        return this.prisma.academicYear.create({
            data: {
                name: dto.name,
                startDate: new Date(dto.startDate),
                endDate: new Date(dto.endDate),
                isCurrent: dto.isCurrent ?? false,
            },
        });
    }
    async getDepartments() {
        return this.prisma.department.findMany({
            include: {
                hod: { select: { id: true, firstName: true, lastName: true, email: true } },
                _count: { select: { teacherProfiles: true, subjects: true } },
            },
        });
    }
    async createDepartment(dto) {
        return this.prisma.department.create({
            data: dto,
        });
    }
    async getClasses() {
        return this.prisma.class.findMany({
            orderBy: { numericOrder: 'asc' },
            include: {
                sections: {
                    include: {
                        _count: { select: { studentEnrollments: true } },
                    },
                },
            },
        });
    }
    async createClass(dto) {
        const existing = await this.prisma.class.findFirst({
            where: {
                OR: [{ name: dto.name }, { numericOrder: dto.numericOrder }],
            },
        });
        if (existing) {
            throw new ConflictException('Class name or numeric order already exists.');
        }
        return this.prisma.class.create({ data: dto });
    }
    async createSection(dto) {
        const classExists = await this.prisma.class.findUnique({
            where: { id: dto.classId },
        });
        if (!classExists) {
            throw new BadRequestException('Class not found.');
        }
        const existingSection = await this.prisma.section.findUnique({
            where: {
                classId_name: {
                    classId: dto.classId,
                    name: dto.name,
                },
            },
        });
        if (existingSection) {
            throw new ConflictException(`Section ${dto.name} already exists for this class.`);
        }
        return this.prisma.section.create({ data: dto });
    }
    async getSubjects(departmentId) {
        return this.prisma.subject.findMany({
            where: departmentId ? { departmentId } : undefined,
            include: {
                department: true,
            },
            orderBy: { name: 'asc' },
        });
    }
    async createSubject(dto) {
        const existing = await this.prisma.subject.findUnique({
            where: { code: dto.code },
        });
        if (existing) {
            throw new ConflictException(`Subject code ${dto.code} already exists.`);
        }
        return this.prisma.subject.create({ data: dto });
    }
};
AcademicsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AcademicsService);
export { AcademicsService };
//# sourceMappingURL=academics.service.js.map