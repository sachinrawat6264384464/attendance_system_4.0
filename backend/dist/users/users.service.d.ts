import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTeacherDto, CreateStudentDto, BulkStudentImportDto } from './dto/users.dto.js';
import { PaginationDto } from '../common/dto/pagination.dto.js';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createTeacher(dto: CreateTeacherDto): Promise<{
        teacherProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            employeeId: string;
            qualification: string | null;
            specialization: string | null;
            departmentId: string | null;
            joiningDate: Date | null;
        } | null;
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        mustChangePassword: boolean;
    }>;
    getTeachers(departmentId?: string, pagination?: PaginationDto): Promise<{
        data: {
            teacherProfile: ({
                department: {
                    id: string;
                    createdAt: Date;
                    name: string;
                    code: string;
                    hodId: string | null;
                } | null;
                _count: {
                    teacherAllocations: number;
                    attendanceSessions: number;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                employeeId: string;
                qualification: string | null;
                specialization: string | null;
                departmentId: string | null;
                joiningDate: Date | null;
            }) | null;
            email: string;
            id: string;
            firstName: string;
            lastName: string;
            phone: string | null;
            isActive: boolean;
        }[];
        meta: {
            totalItems: number;
            page: number;
            pageSize: number;
            totalPages: number;
        };
    }>;
    createStudent(dto: CreateStudentDto): Promise<{
        studentProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            admissionNumber: string;
            rollNumber: string | null;
            dateOfBirth: Date | null;
            gender: string | null;
            guardianName: string | null;
            guardianPhone: string | null;
            bloodGroup: string | null;
            address: string | null;
        } | null;
    } & {
        email: string;
        id: string;
        passwordHash: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        avatarUrl: string | null;
        isActive: boolean;
        mustChangePassword: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    bulkImportStudents(dto: BulkStudentImportDto): Promise<{
        totalSubmitted: number;
        successful: number;
        failed: number;
        details: ({
            email: string;
            success: boolean;
            id: string;
            error?: undefined;
        } | {
            email: string;
            success: boolean;
            error: any;
            id?: undefined;
        })[];
    }>;
    getStudents(classId?: string, sectionId?: string, academicYearId?: string, search?: string, pagination?: PaginationDto): Promise<{
        data: ({
            academicYear: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                startDate: Date;
                endDate: Date;
                isCurrent: boolean;
            };
            class: {
                id: string;
                createdAt: Date;
                name: string;
                numericOrder: number;
            };
            section: {
                id: string;
                createdAt: Date;
                name: string;
                classId: string;
                roomNumber: string | null;
            };
            student: {
                user: {
                    email: string;
                    id: string;
                    firstName: string;
                    lastName: string;
                    phone: string | null;
                    isActive: boolean;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                admissionNumber: string;
                rollNumber: string | null;
                dateOfBirth: Date | null;
                gender: string | null;
                guardianName: string | null;
                guardianPhone: string | null;
                bloodGroup: string | null;
                address: string | null;
            };
        } & {
            id: string;
            isActive: boolean;
            createdAt: Date;
            rollNumber: string | null;
            studentId: string;
            academicYearId: string;
            classId: string;
            sectionId: string;
        })[];
        meta: {
            totalItems: number;
            page: number;
            pageSize: number;
            totalPages: number;
        };
    }>;
}
