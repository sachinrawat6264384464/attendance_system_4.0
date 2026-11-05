import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { AuthenticatedUser } from '../common/decorators/current-user.decorator.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, req: Request, res: Response): Promise<{
        message: string;
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
        accessToken: string;
    }>;
    refresh(req: Request, res: Response): Promise<{
        message: string;
        accessToken: string;
    }>;
    logout(user: AuthenticatedUser, req: Request, res: Response): Promise<{
        message: string;
    }>;
    getProfile(user: AuthenticatedUser): Promise<{
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
    changePassword(user: AuthenticatedUser, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
