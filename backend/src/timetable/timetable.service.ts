import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTimetableSlotDto } from './dto/timetable.dto.js';

@Injectable()
export class TimetableService {
  constructor(private readonly prisma: PrismaService) {}

  async createSlot(dto: CreateTimetableSlotDto) {
    // 1. Conflict check: Section already booked
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
      throw new ConflictException(
        `Section already has ${sectionConflict.subject.name} scheduled for Day ${dto.dayOfWeek}, Period ${dto.periodNumber}.`,
      );
    }

    // 2. Conflict check: Teacher already booked elsewhere
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
      throw new ConflictException(
        `Teacher is already scheduled to teach ${teacherConflict.class.name} - ${teacherConflict.section.name} at Day ${dto.dayOfWeek}, Period ${dto.periodNumber}.`,
      );
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

  async getSectionTimetable(classId: string, sectionId: string, academicYearId?: string) {
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

  async getTeacherSchedule(teacherProfileId: string, academicYearId?: string) {
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

  async getStudentSchedule(studentProfileId: string, academicYearId?: string) {
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

  async deleteSlot(id: string) {
    return this.prisma.timetableSlot.delete({ where: { id } });
  }
}

