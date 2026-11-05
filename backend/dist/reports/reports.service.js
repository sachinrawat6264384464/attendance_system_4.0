var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { AttendanceStatus, CorrectionStatus } from '@prisma/client';
let ReportsService = class ReportsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPrincipalDashboard() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const [totalStudents, totalTeachers, totalClasses, totalSections, pendingCorrections, activeAssignments, todaySessions,] = await Promise.all([
            this.prisma.studentEnrollment.count({ where: { isActive: true } }),
            this.prisma.teacherProfile.count(),
            this.prisma.class.count(),
            this.prisma.section.count(),
            this.prisma.attendanceCorrectionRequest.count({
                where: { approvalStatus: CorrectionStatus.PENDING },
            }),
            this.prisma.assignment.count({
                where: { dueDate: { gte: new Date() } },
            }),
            this.prisma.attendanceSession.findMany({
                where: { date: today },
                include: {
                    records: { select: { status: true } },
                },
            }),
        ]);
        let totalMarks = 0;
        let presentMarks = 0;
        for (const session of todaySessions) {
            for (const rec of session.records) {
                totalMarks++;
                if (rec.status === AttendanceStatus.PRESENT || rec.status === AttendanceStatus.LATE) {
                    presentMarks++;
                }
            }
        }
        const todayAttendancePercentage = totalMarks > 0 ? parseFloat(((presentMarks / totalMarks) * 100).toFixed(2)) : 0;
        return {
            totalStudents,
            totalTeachers,
            totalClasses,
            totalSections,
            pendingCorrections,
            activeAssignments,
            todaySessionsCount: todaySessions.length,
            todayAttendancePercentage,
        };
    }
    async getHodDashboard(departmentId) {
        const [department, facultyCount, subjects] = await Promise.all([
            this.prisma.department.findUnique({
                where: { id: departmentId },
                include: {
                    hod: { select: { firstName: true, lastName: true, email: true } },
                },
            }),
            this.prisma.teacherProfile.count({ where: { departmentId } }),
            this.prisma.subject.findMany({
                where: { departmentId },
                include: {
                    _count: { select: { assignments: true, teacherAllocations: true } },
                },
            }),
        ]);
        return {
            department,
            facultyCount,
            subjects,
        };
    }
};
ReportsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ReportsService);
export { ReportsService };
//# sourceMappingURL=reports.service.js.map