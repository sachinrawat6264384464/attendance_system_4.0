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
          schoolName: process.env.SCHOOL_NAME || 'Om Public School Dabra',
          schoolCode: process.env.SCHOOL_CODE || 'OPS-DABRA',
          affiliationNo: process.env.SCHOOL_AFFILIATION_NO || 'MP-GWL-2027-OPS',
          email: process.env.SCHOOL_EMAIL || 'info@ompublicschool.edu.in',
          phone: process.env.SCHOOL_PHONE || '+91 7999083379, +91 9516469021',
          address: process.env.SCHOOL_ADDRESS || 'Deedar Colony, Dabra, District Gwalior (M.P.)',
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

  async updateSchoolInfo(data: any) {
    let setting = await this.prisma.schoolSetting.findFirst();
    if (setting) {
      return this.prisma.schoolSetting.update({
        where: { id: setting.id },
        data: {
          schoolName: data.schoolName ?? setting.schoolName,
          schoolCode: data.schoolCode ?? setting.schoolCode,
          affiliationNo: data.affiliationNo ?? setting.affiliationNo,
          email: data.email ?? setting.email,
          phone: data.phone ?? setting.phone,
          address: data.address ?? setting.address,
        },
      });
    } else {
      return this.prisma.schoolSetting.create({
        data: {
          schoolName: data.schoolName || 'Om Public School Dabra',
          schoolCode: data.schoolCode || 'OPS-DABRA',
          affiliationNo: data.affiliationNo || 'MP-GWL-2027-OPS',
          email: data.email || 'info@ompublicschool.edu.in',
          phone: data.phone || '+91 7999083379, +91 9516469021',
          address: data.address || 'Deedar Colony, Dabra, District Gwalior (M.P.)',
        },
      });
    }
  }

  async updateAdmissionStatus(id: string, status: any) {
    return this.prisma.admissionEnquiry.update({
      where: { id },
      data: { status },
    });
  }
}

