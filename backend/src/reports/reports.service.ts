import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { AttendanceStatus, CorrectionStatus } from '@prisma/client';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPrincipalDashboard() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalStudents,
      totalTeachers,
      totalClasses,
      totalSections,
      pendingCorrections,
      activeAssignments,
      todaySessions,
    ] = await Promise.all([
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

    // Calculate today's attendance rate
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
    const todayAttendancePercentage =
      totalMarks > 0 ? parseFloat(((presentMarks / totalMarks) * 100).toFixed(2)) : 0;

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

  async getHodDashboard(departmentId: string) {
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
}

