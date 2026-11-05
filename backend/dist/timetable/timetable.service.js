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
let TimetableService = class TimetableService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSlot(dto) {
        const sectionConflict = await this.prisma.timetableSlot.findFirst({
            where: {
                academicYearId: dto.academicYearId,
                classId: dto.classId,
                sectionId: dto.sectionId,
                dayOfWeek: dto.dayOfWeek,
                periodNumber: dto.periodNumber,
            },
            include: { subject: true },
        });
        if (sectionConflict) {
            throw new ConflictException(`Section already has ${sectionConflict.subject.name} scheduled for Day ${dto.dayOfWeek}, Period ${dto.periodNumber}.`);
        }
        const teacherConflict = await this.prisma.timetableSlot.findFirst({
            where: {
                academicYearId: dto.academicYearId,
                teacherId: dto.teacherId,
                dayOfWeek: dto.dayOfWeek,
                periodNumber: dto.periodNumber,
            },
            include: { class: true, section: true },
        });
        if (teacherConflict) {
            throw new ConflictException(`Teacher is already scheduled to teach ${teacherConflict.class.name} - ${teacherConflict.section.name} at Day ${dto.dayOfWeek}, Period ${dto.periodNumber}.`);
        }
        return this.prisma.timetableSlot.create({
            data: dto,
            include: {
                subject: true,
                class: true,
                section: true,
                teacher: { include: { user: { select: { firstName: true, lastName: true } } } },
            },
        });
    }
    async getSectionTimetable(classId, sectionId, academicYearId) {
        let yearId = academicYearId;
        if (!yearId) {
            const currentYear = await this.prisma.academicYear.findFirst({ where: { isCurrent: true } });
            yearId = currentYear?.id;
        }
        return this.prisma.timetableSlot.findMany({
            where: {
                classId,
                sectionId,
                ...(yearId ? { academicYearId: yearId } : {}),
            },
            include: {
                subject: true,
                teacher: { include: { user: { select: { firstName: true, lastName: true } } } },
            },
            orderBy: [{ dayOfWeek: 'asc' }, { periodNumber: 'asc' }],
        });
    }
    async getTeacherSchedule(teacherProfileId, academicYearId) {
        let yearId = academicYearId;
        if (!yearId) {
            const currentYear = await this.prisma.academicYear.findFirst({ where: { isCurrent: true } });
            yearId = currentYear?.id;
        }
        return this.prisma.timetableSlot.findMany({
            where: {
                teacherId: teacherProfileId,
                ...(yearId ? { academicYearId: yearId } : {}),
            },
            include: {
                subject: true,
                class: true,
                section: true,
            },
            orderBy: [{ dayOfWeek: 'asc' }, { periodNumber: 'asc' }],
        });
    }
    async getStudentSchedule(studentProfileId, academicYearId) {
        let yearId = academicYearId;
        if (!yearId) {
            const currentYear = await this.prisma.academicYear.findFirst({ where: { isCurrent: true } });
            yearId = currentYear?.id;
        }
        const enrollment = await this.prisma.studentEnrollment.findFirst({
            where: {
                studentId: studentProfileId,
                isActive: true,
                ...(yearId ? { academicYearId: yearId } : {}),
            },
        });
        if (!enrollment) {
            throw new NotFoundException('Active student enrollment not found.');
        }
        return this.getSectionTimetable(enrollment.classId, enrollment.sectionId, enrollment.academicYearId);
    }
    async deleteSlot(id) {
        return this.prisma.timetableSlot.delete({ where: { id } });
    }
};
TimetableService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], TimetableService);
export { TimetableService };
//# sourceMappingURL=timetable.service.js.map