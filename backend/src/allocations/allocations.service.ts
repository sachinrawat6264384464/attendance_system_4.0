import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAllocationDto } from './dto/allocation.dto.js';

@Injectable()
export class AllocationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createAllocation(dto: CreateAllocationDto) {
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

  async getAllocations(academicYearId?: string, teacherId?: string, classId?: string, sectionId?: string) {
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

  async deleteAllocation(id: string) {
    const alloc = await this.prisma.teacherAllocation.findUnique({ where: { id } });
    if (!alloc) {
      throw new NotFoundException('Allocation not found.');
    }
    return this.prisma.teacherAllocation.delete({ where: { id } });
  }
}

