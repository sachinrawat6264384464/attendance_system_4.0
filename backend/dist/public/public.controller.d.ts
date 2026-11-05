import { PublicService } from './public.service.js';
import { CreateAdmissionEnquiryDto } from './dto/public.dto.js';
export declare class PublicController {
    private readonly publicService;
    constructor(publicService: PublicService);
    getSchoolInfo(): Promise<{
        email: string;
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        schoolName: string;
        schoolCode: string;
        affiliationNo: string;
        timezone: string;
        currency: string;
        minPeriodsPresent: number;
        correctionWindowDays: number;
    }>;
    getFacultyDirectory(): Promise<{
        user: {
            firstName: string;
            lastName: string;
            avatarUrl: string | null;
        };
        department: {
            name: string;
            code: string;
        } | null;
        id: string;
        employeeId: string;
        qualification: string | null;
        specialization: string | null;
    }[]>;
    submitAdmissionEnquiry(dto: CreateAdmissionEnquiryDto): Promise<{
        email: string;
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        guardianName: string;
        status: import("@prisma/client").$Enums.EnquiryStatus;
        message: string | null;
        studentName: string;
        applyingForGrade: string;
    }>;
    getAdmissionEnquiries(): Promise<{
        email: string;
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        guardianName: string;
        status: import("@prisma/client").$Enums.EnquiryStatus;
        message: string | null;
        studentName: string;
        applyingForGrade: string;
    }[]>;
    updateSchoolInfo(dto: any): Promise<{
        email: string;
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        schoolName: string;
        schoolCode: string;
        affiliationNo: string;
        timezone: string;
        currency: string;
        minPeriodsPresent: number;
        correctionWindowDays: number;
    }>;
    updateAdmissionStatus(id: string, status: any): Promise<{
        email: string;
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        guardianName: string;
        status: import("@prisma/client").$Enums.EnquiryStatus;
        message: string | null;
        studentName: string;
        applyingForGrade: string;
    }>;
}
