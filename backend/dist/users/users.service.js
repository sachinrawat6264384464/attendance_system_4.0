var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, ConflictException, } from '@nestjs/common';
import * as argon2 from 'argon2';
import { RoleType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTeacher(dto) {
        const existingEmail = await this.prisma.user.findUnique({
            where: { email: dto.email.toLowerCase().trim() },
        });
        if (existingEmail) {
            throw new ConflictException(`User with email ${dto.email} already exists.`);
        }
        const existingEmp = await this.prisma.teacherProfile.findUnique({
            where: { employeeId: dto.employeeId },
        });
        if (existingEmp) {
            throw new ConflictException(`Employee ID ${dto.employeeId} already exists.`);
        }
        let teacherRole = await this.prisma.role.findUnique({
            where: { name: RoleType.TEACHER },
        });
        if (!teacherRole) {
            teacherRole = await this.prisma.role.create({
                data: { name: RoleType.TEACHER, description: 'Academic Faculty' },
            });
        }
        const tempPassword = dto.temporaryPassword || 'TeacherTemp@123';
        const passwordHash = await argon2.hash(tempPassword);
        return this.prisma.user.create({
            data: {
                email: dto.email.toLowerCase().trim(),
                passwordHash,
                firstName: dto.firstName,
                lastName: dto.lastName,
                phone: dto.phone,
                mustChangePassword: true,
                roles: {
                    create: { roleId: teacherRole.id },
                },
                teacherProfile: {
                    create: {
                        employeeId: dto.employeeId,
                        qualification: dto.qualification,
                        specialization: dto.specialization,
                        departmentId: dto.departmentId,
                        joiningDate: new Date(),
                    },
                },
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                mustChangePassword: true,
                teacherProfile: true,
            },
        });
    }
    async getTeachers(departmentId, pagination) {
        const skip = pagination?.skip ?? 0;
        const take = pagination?.take ?? 50;
        const where = departmentId
            ? { teacherProfile: { departmentId } }
            : { teacherProfile: { isNot: null } };
        const [total, teachers] = await Promise.all([
            this.prisma.user.count({ where }),
            this.prisma.user.findMany({
                where,
                skip,
                take,
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                    isActive: true,
                    teacherProfile: {
                        include: {
                            department: true,
                            _count: {
                                select: {
                                    teacherAllocations: true,
                                    attendanceSessions: true,
                                },
                            },
                        },
                    },
                },
                orderBy: { firstName: 'asc' },
            }),
        ]);
        return {
            data: teachers,
            meta: {
                totalItems: total,
                page: pagination?.page ?? 1,
                pageSize: take,
                totalPages: Math.ceil(total / take),
            },
        };
    }
    async createStudent(dto) {
        const existingEmail = await this.prisma.user.findUnique({
            where: { email: dto.email.toLowerCase().trim() },
        });
        if (existingEmail) {
            throw new ConflictException(`User with email ${dto.email} already exists.`);
        }
        const existingAdmission = await this.prisma.studentProfile.findUnique({
            where: { admissionNumber: dto.admissionNumber },
        });
        if (existingAdmission) {
            throw new ConflictException(`Admission Number ${dto.admissionNumber} already exists.`);
        }
        let studentRole = await this.prisma.role.findUnique({
            where: { name: RoleType.STUDENT },
        });
        if (!studentRole) {
            studentRole = await this.prisma.role.create({
                data: { name: RoleType.STUDENT, description: 'Enrolled Student' },
            });
        }
        const tempPassword = dto.temporaryPassword || 'StudentTemp@123';
        const passwordHash = await argon2.hash(tempPassword);
        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email: dto.email.toLowerCase().trim(),
                    passwordHash,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    mustChangePassword: true,
                    roles: {
                        create: { roleId: studentRole.id },
                    },
                    studentProfile: {
                        create: {
                            admissionNumber: dto.admissionNumber,
                            rollNumber: dto.rollNumber,
                            dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
                            gender: dto.gender,
                            guardianName: dto.guardianName,
                            guardianPhone: dto.guardianPhone,
                        },
                    },
                },
                include: {
                    studentProfile: true,
                },
            });
            if (user.studentProfile) {
                await tx.studentEnrollment.create({
                    data: {
                        studentId: user.studentProfile.id,
                        academicYearId: dto.academicYearId,
                        classId: dto.classId,
                        sectionId: dto.sectionId,
                        rollNumber: dto.rollNumber,
                    },
                });
            }
            return user;
        });
    }
    async bulkImportStudents(dto) {
        const results = [];
        for (const student of dto.students) {
            try {
                const created = await this.createStudent(student);
                results.push({ email: student.email, success: true, id: created.id });
            }
            catch (err) {
                results.push({ email: student.email, success: false, error: err.message });
            }
        }
        return {
            totalSubmitted: dto.students.length,
            successful: results.filter((r) => r.success).length,
            failed: results.filter((r) => !r.success).length,
            details: results,
        };
    }
    async getStudents(classId, sectionId, academicYearId, search, pagination) {
        const skip = pagination?.skip ?? 0;
        const take = pagination?.take ?? 30;
        const where = {
            isActive: true,
        };
        if (academicYearId) {
            where.academicYearId = academicYearId;
        }
        if (classId) {
            where.classId = classId;
        }
        if (sectionId) {
            where.sectionId = sectionId;
        }
        if (search) {
            where.student = {
                OR: [
                    { admissionNumber: { contains: search, mode: 'insensitive' } },
                    { rollNumber: { contains: search, mode: 'insensitive' } },
                    {
                        user: {
                            OR: [
                                { firstName: { contains: search, mode: 'insensitive' } },
                                { lastName: { contains: search, mode: 'insensitive' } },
                                { email: { contains: search, mode: 'insensitive' } },
                            ],
                        },
                    },
                ],
            };
        }
        const [total, enrollments] = await Promise.all([
            this.prisma.studentEnrollment.count({ where }),
            this.prisma.studentEnrollment.findMany({
                where,
                skip,
                take,
                include: {
                    class: true,
                    section: true,
                    academicYear: true,
                    student: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    email: true,
                                    firstName: true,
                                    lastName: true,
                                    phone: true,
                                    isActive: true,
                                },
                            },
                        },
                    },
                },
                orderBy: [{ rollNumber: 'asc' }],
            }),
        ]);
        return {
            data: enrollments,
            meta: {
                totalItems: total,
                page: pagination?.page ?? 1,
                pageSize: take,
                totalPages: Math.ceil(total / take),
            },
        };
    }
};
UsersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map