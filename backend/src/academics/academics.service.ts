import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  CreateAcademicYearDto,
  CreateClassDto,
  CreateSectionDto,
  CreateSubjectDto,
  CreateDepartmentDto,
} from './dto/academics.dto.js';

@Injectable()
export class AcademicsService {
  constructor(private readonly prisma: PrismaService) {}

  // ---------------- Academic Years ----------------
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

  async createAcademicYear(dto: CreateAcademicYearDto) {
    const existing = await this.prisma.academicYear.findUnique({
      where: { name: dto.name },
    });
    if (existing) {
      throw new ConflictException(`Academic year ${dto.name} already exists.`);
    }

    if (dto.isCurrent) {
      // Unset previous current years
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

  // ---------------- Departments ----------------
  async getDepartments() {
    return this.prisma.department.findMany({
      include: {
        hod: { select: { id: true, firstName: true, lastName: true, email: true } },
        _count: { select: { teacherProfiles: true, subjects: true } },
      },
    });
  }

  async createDepartment(dto: CreateDepartmentDto) {
    return this.prisma.department.create({
      data: dto,
    });
  }

  // ---------------- Classes & Sections ----------------
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

  async createClass(dto: CreateClassDto) {
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

  async createSection(dto: CreateSectionDto) {
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

  // ---------------- Subjects ----------------
  async getSubjects(departmentId?: string) {
    return this.prisma.subject.findMany({
      where: departmentId ? { departmentId } : undefined,
      include: {
        department: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async createSubject(dto: CreateSubjectDto) {
    const existing = await this.prisma.subject.findUnique({
      where: { code: dto.code },
    });
    if (existing) {
      throw new ConflictException(`Subject code ${dto.code} already exists.`);
    }
    return this.prisma.subject.create({ data: dto });
  }
}

