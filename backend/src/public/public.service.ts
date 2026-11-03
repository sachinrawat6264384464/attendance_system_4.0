import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAdmissionEnquiryDto } from './dto/public.dto.js';

@Injectable()
export class PublicService {
  constructor(private readonly prisma: PrismaService) {}

  async getSchoolInfo() {
    let setting = await this.prisma.schoolSetting.findFirst();
    if (!setting) {
      setting = await this.prisma.schoolSetting.create({
        data: {
          schoolName: process.env.SCHOOL_NAME || 'Apex Model Senior Secondary School',
          schoolCode: process.env.SCHOOL_CODE || 'APEX-SCH-01',
          affiliationNo: process.env.SCHOOL_AFFILIATION_NO || 'CBSE-AFF-2024-987',
          email: process.env.SCHOOL_EMAIL || 'admin@apexschool.edu',
          phone: process.env.SCHOOL_PHONE || '+91 98765 43210',
          address: process.env.SCHOOL_ADDRESS || 'Knowledge City, Sector 4, Educational Hub',
        },
      });
    }
    return setting;
  }

  async getFacultyDirectory() {
    return this.prisma.teacherProfile.findMany({
      where: { user: { isActive: true } },
      select: {
        id: true,
        employeeId: true,
        qualification: true,
        specialization: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
        department: {
          select: {
            name: true,
            code: true,
          },
        },
      },
      orderBy: { user: { firstName: 'asc' } },
    });
  }

  async submitAdmissionEnquiry(dto: CreateAdmissionEnquiryDto) {
    return this.prisma.admissionEnquiry.create({
      data: dto,
    });
  }

  async getAdmissionEnquiries() {
    return this.prisma.admissionEnquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}

