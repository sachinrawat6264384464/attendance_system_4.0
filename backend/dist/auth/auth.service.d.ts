import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly configService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    private hashToken;
    login(loginDto: LoginDto, ipAddress?: string, userAgent?: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            roles: import("@prisma/client").$Enums.RoleType[];
            mustChangePassword: boolean;
            teacherProfileId: string | undefined;
            studentProfileId: string | undefined;
        };
    }>;
    refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string, refreshToken?: string): Promise<{
        message: string;
    }>;
    changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    getProfile(userId: string): Promise<{
        roles: import("@prisma/client").$Enums.RoleType[];
        teacherProfile: ({
            department: {
                id: string;
                createdAt: Date;
                name: string;
                code: string;
                hodId: string | null;
            } | null;
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
        studentProfile: ({
            studentEnrollments: ({
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
        }) | null;
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        avatarUrl: string | null;
        mustChangePassword: boolean;
    }>;
    private generateTokens;
}
