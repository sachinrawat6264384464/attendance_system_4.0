import {
  Injectable,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AttendanceStatus, CorrectionStatus, SessionStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  SubmitAttendanceDto,
  RequestCorrectionDto,
  ReviewCorrectionDto,
} from './dto/attendance.dto.js';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  // ---------------- ATTENDANCE SUBMISSION ----------------
  async submitAttendance(teacherProfileId: string, dto: SubmitAttendanceDto) {
    const sessionDate = new Date(dto.date);

    // 1. Verify Teacher Allocation
    const allocation = await this.prisma.teacherAllocation.findFirst({
      where: {
        academicYearId: dto.academicYearId,
        teacherId: teacherProfileId,
        subjectId: dto.subjectId,
        classId: dto.classId,
        sectionId: dto.sectionId,
      },
    });

    if (!allocation) {
      throw new ForbiddenException(
        'You are not authorized to mark attendance for this subject/class/section.',
      );
    }

    // 2. Prevent Duplicate Attendance for the same Class, Section, Date & Period
    const existingSession = await this.prisma.attendanceSession.findFirst({
      where: {
        academicYearId: dto.academicYearId,
        classId: dto.classId,
        sectionId: dto.sectionId,
        date: sessionDate,
        periodNumber: dto.periodNumber,
      },
    });

    if (existingSession) {
      throw new ConflictException(
        `Attendance has already been submitted and finalized for Period ${dto.periodNumber} on ${dto.date}.`,
      );
    }

    // 3. Save Session and Records in a Transaction
    return this.prisma.$transaction(async (tx) => {
      const session = await tx.attendanceSession.create({
        data: {
          academicYearId: dto.academicYearId,
          classId: dto.classId,
          sectionId: dto.sectionId,
          subjectId: dto.subjectId,
          teacherId: teacherProfileId,
          date: sessionDate,
          periodNumber: dto.periodNumber,
          status: SessionStatus.FINALIZED,
          isFinalized: true,
          finalizedAt: new Date(),
          remarks: dto.remarks,
        },
      });

      // Insert attendance records for all provided students
      await tx.attendanceRecord.createMany({
        data: dto.records.map((r) => ({
          sessionId: session.id,
          studentId: r.studentId,
          status: r.status,
          remarks: r.remarks,
        })),
      });

      const counts = {
        present: dto.records.filter((r) => r.status === AttendanceStatus.PRESENT).length,
        absent: dto.records.filter((r) => r.status === AttendanceStatus.ABSENT).length,
        late: dto.records.filter((r) => r.status === AttendanceStatus.LATE).length,
        excused: dto.records.filter((r) => r.status === AttendanceStatus.EXCUSED).length,
        total: dto.records.length,
      };

      return {
        session,
        summary: counts,
        message: 'Period attendance submitted and finalized successfully.',
      };
    });
  }

  // ---------------- RETRIEVE SESSIONS & DETAILS ----------------
  async getSession(sessionId: string) {
    const session = await this.prisma.attendanceSession.findUnique({
      where: { id: sessionId },
      include: {
        class: true,
        section: true,
        subject: true,
        teacher: {
          include: {
            user: { select: { firstName: true, lastName: true, email: true } },
          },
        },
        records: {
          include: {
            student: {
              include: {
                user: { select: { firstName: true, lastName: true } },
              },
            },
          },
          orderBy: { student: { rollNumber: 'asc' } },
        },
      },
    });

    if (!session) {
      throw new NotFoundException('Attendance session not found.');
    }

    return session;
  }

  async getSessions(
    classId?: string,
    sectionId?: string,
    date?: string,
    teacherProfileId?: string,
    academicYearId?: string,
  ) {
    const where: any = {};
    if (classId) where.classId = classId;
    if (sectionId) where.sectionId = sectionId;
    if (date) where.date = new Date(date);
    if (teacherProfileId) where.teacherId = teacherProfileId;
    if (academicYearId) where.academicYearId = academicYearId;

    return this.prisma.attendanceSession.findMany({
      where,
      include: {
        class: true,
        section: true,
        subject: true,
        teacher: { include: { user: { select: { firstName: true, lastName: true, email: true } } } },
        records: {
          select: {
            id: true,
            status: true,
            student: {
              select: {
                id: true,
                rollNumber: true,
                user: { select: { firstName: true, lastName: true } },
              },
            },
          },
        },
        _count: { select: { records: true } },
      },
      orderBy: [{ date: 'desc' }, { periodNumber: 'asc' }],
      take: 100,
    });
  }

  // ---------------- CORRECTION REQUESTS & AUDIT LOG ----------------
  async requestCorrection(userId: string, dto: RequestCorrectionDto) {
    const record = await this.prisma.attendanceRecord.findUnique({
      where: { id: dto.attendanceRecordId },
      include: { session: true },
    });

    if (!record) {
      throw new NotFoundException('Attendance record not found.');
    }

    // Check if there is already a pending request for this record
    const pending = await this.prisma.attendanceCorrectionRequest.findFirst({
      where: {
        attendanceRecordId: dto.attendanceRecordId,
        approvalStatus: CorrectionStatus.PENDING,
      },
    });

    if (pending) {
      throw new ConflictException(
        'A correction request is already pending approval for this record.',
      );
    }

    return this.prisma.attendanceCorrectionRequest.create({
      data: {
        attendanceRecordId: dto.attendanceRecordId,
        requestedById: userId,
        oldStatus: record.status,
        newStatus: dto.newStatus,
        reason: dto.reason,
      },
      include: {
        attendanceRecord: {
          include: {
            student: { include: { user: { select: { firstName: true, lastName: true } } } },
            session: { include: { subject: true, class: true, section: true } },
          },
        },
      },
    });
  }

  async getPendingCorrections() {
    return this.prisma.attendanceCorrectionRequest.findMany({
      where: { approvalStatus: CorrectionStatus.PENDING },
      include: {
        requestedBy: { select: { firstName: true, lastName: true, email: true } },
        attendanceRecord: {
          include: {
            student: { include: { user: { select: { firstName: true, lastName: true } } } },
            session: { include: { subject: true, class: true, section: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async reviewCorrection(approverId: string, requestId: string, dto: ReviewCorrectionDto) {
    const request = await this.prisma.attendanceCorrectionRequest.findUnique({
      where: { id: requestId },
      include: { attendanceRecord: true },
    });

    if (!request) {
      throw new NotFoundException('Correction request not found.');
    }

    if (request.approvalStatus !== CorrectionStatus.PENDING) {
      throw new BadRequestException('This correction request has already been reviewed.');
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Update the request status
      const updatedRequest = await tx.attendanceCorrectionRequest.update({
        where: { id: requestId },
        data: {
          approvalStatus: dto.decision,
          reviewedById: approverId,
          reviewedAt: new Date(),
          reviewNotes: dto.reviewNotes,
        },
      });

      // 2. If approved, update the actual attendance record & write immutable audit log
      if (dto.decision === CorrectionStatus.APPROVED) {
        await tx.attendanceRecord.update({
          where: { id: request.attendanceRecordId },
          data: { status: request.newStatus },
        });

        await tx.attendanceAuditLog.create({
          data: {
            attendanceRecordId: request.attendanceRecordId,
            userId: approverId,
            action: 'ATTENDANCE_CORRECTION_APPROVED',
            oldStatus: request.oldStatus,
            newStatus: request.newStatus,
            reason: request.reason,
          },
        });
      }

      return {
        request: updatedRequest,
        message: `Correction request has been ${dto.decision.toLowerCase()}.`,
      };
    });
  }

  // ---------------- STUDENT & CLASS ANALYTICS ----------------
  async getStudentAttendanceSummary(studentProfileId: string, academicYearId?: string) {
    const records = await this.prisma.attendanceRecord.findMany({
      where: {
        studentId: studentProfileId,
        session: academicYearId ? { academicYearId } : undefined,
      },
      include: {
        session: {
          select: {
            date: true,
            periodNumber: true,
            subject: { select: { id: true, name: true, code: true } },
          },
        },
      },
      orderBy: { session: { date: 'desc' } },
    });

    const totalPeriods = records.length;
    const presentPeriods = records.filter(
      (r) => r.status === AttendanceStatus.PRESENT || r.status === AttendanceStatus.LATE,
    ).length;
    const absentPeriods = records.filter((r) => r.status === AttendanceStatus.ABSENT).length;
    const overallPercentage =
      totalPeriods > 0 ? parseFloat(((presentPeriods / totalPeriods) * 100).toFixed(2)) : 0;

    // Subject-wise breakdown
    const subjectMap = new Map<string, { name: string; code: string; total: number; present: number }>();
    for (const r of records) {
      const sub = r.session.subject;
      if (!subjectMap.has(sub.id)) {
        subjectMap.set(sub.id, { name: sub.name, code: sub.code, total: 0, present: 0 });
      }
      const entry = subjectMap.get(sub.id)!;
      entry.total += 1;
      if (r.status === AttendanceStatus.PRESENT || r.status === AttendanceStatus.LATE) {
        entry.present += 1;
      }
    }

    const subjectBreakdown = Array.from(subjectMap.entries()).map(([subjectId, stats]) => ({
      subjectId,
      name: stats.name,
      code: stats.code,
      totalPeriods: stats.total,
      attendedPeriods: stats.present,
      percentage: stats.total > 0 ? parseFloat(((stats.present / stats.total) * 100).toFixed(2)) : 0,
    }));

    return {
      totalPeriods,
      presentPeriods,
      absentPeriods,
      overallPercentage,
      subjectBreakdown,
      recentRecords: records.slice(0, 10).map((r) => ({
        id: r.id,
        date: r.session.date,
        periodNumber: r.session.periodNumber,
        subject: r.session.subject.name,
        status: r.status,
      })),
    };
  }

  async getClassAttendanceReport(
    classId: string,
    sectionId: string,
    academicYearId: string,
    startDate?: string,
    endDate?: string,
  ) {
    const where: any = {
      classId,
      sectionId,
      academicYearId,
    };

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const sessions = await this.prisma.attendanceSession.findMany({
      where,
      include: {
        records: { select: { studentId: true, status: true } },
      },
    });

    const totalSessions = sessions.length;
    let totalPresentMarks = 0;
    let totalAbsentMarks = 0;

    for (const s of sessions) {
      for (const r of s.records) {
        if (r.status === AttendanceStatus.PRESENT || r.status === AttendanceStatus.LATE) {
          totalPresentMarks++;
        } else if (r.status === AttendanceStatus.ABSENT) {
          totalAbsentMarks++;
        }
      }
    }

    const totalMarks = totalPresentMarks + totalAbsentMarks;
    const averageAttendance = totalMarks > 0 ? parseFloat(((totalPresentMarks / totalMarks) * 100).toFixed(2)) : 0;

    return {
      totalSessions,
      totalMarksRecorded: totalMarks,
      averageAttendance,
      sessionsCount: totalSessions,
    };
  }
}

