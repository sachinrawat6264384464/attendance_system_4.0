import { AttendanceService } from './attendance.service.js';
import { SubmitAttendanceDto, RequestCorrectionDto, ReviewCorrectionDto } from './dto/attendance.dto.js';
import { AuthenticatedUser } from '../common/decorators/current-user.decorator.js';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    submitAttendance(user: AuthenticatedUser, dto: SubmitAttendanceDto): Promise<{
        session: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            academicYearId: string;
            classId: string;
            sectionId: string;
            teacherId: string;
            subjectId: string;
            periodNumber: number;
            status: import("@prisma/client").$Enums.SessionStatus;
            remarks: string | null;
            date: Date;
            isFinalized: boolean;
            finalizedAt: Date | null;
        };
        summary: {
            present: number;
            absent: number;
            late: number;
            excused: number;
            total: number;
        };
        message: string;
    }>;
    getSessions(classId?: string, sectionId?: string, date?: string, academicYearId?: string): Promise<({
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
        subject: {
            id: string;
            createdAt: Date;
            name: string;
            departmentId: string | null;
            code: string;
            isElective: boolean;
        };
        _count: {
            records: number;
        };
        teacher: {
            user: {
                email: string;
                firstName: string;
                lastName: string;
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
        };
        records: {
            id: string;
            student: {
                user: {
                    firstName: string;
                    lastName: string;
                };
                id: string;
                rollNumber: string | null;
            };
            status: import("@prisma/client").$Enums.AttendanceStatus;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        academicYearId: string;
        classId: string;
        sectionId: string;
        teacherId: string;
        subjectId: string;
        periodNumber: number;
        status: import("@prisma/client").$Enums.SessionStatus;
        remarks: string | null;
        date: Date;
        isFinalized: boolean;
        finalizedAt: Date | null;
    })[]>;
    getSession(id: string): Promise<{
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
        subject: {
            id: string;
            createdAt: Date;
            name: string;
            departmentId: string | null;
            code: string;
            isElective: boolean;
        };
        teacher: {
            user: {
                email: string;
                firstName: string;
                lastName: string;
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
        };
        records: ({
            student: {
                user: {
                    firstName: string;
                    lastName: string;
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
            createdAt: Date;
            updatedAt: Date;
            studentId: string;
            status: import("@prisma/client").$Enums.AttendanceStatus;
            remarks: string | null;
            sessionId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        academicYearId: string;
        classId: string;
        sectionId: string;
        teacherId: string;
        subjectId: string;
        periodNumber: number;
        status: import("@prisma/client").$Enums.SessionStatus;
        remarks: string | null;
        date: Date;
        isFinalized: boolean;
        finalizedAt: Date | null;
    }>;
    requestCorrection(user: AuthenticatedUser, dto: RequestCorrectionDto): Promise<{
        attendanceRecord: {
            student: {
                user: {
                    firstName: string;
                    lastName: string;
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
            session: {
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
                subject: {
                    id: string;
                    createdAt: Date;
                    name: string;
                    departmentId: string | null;
                    code: string;
                    isElective: boolean;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                academicYearId: string;
                classId: string;
                sectionId: string;
                teacherId: string;
                subjectId: string;
                periodNumber: number;
                status: import("@prisma/client").$Enums.SessionStatus;
                remarks: string | null;
                date: Date;
                isFinalized: boolean;
                finalizedAt: Date | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            studentId: string;
            status: import("@prisma/client").$Enums.AttendanceStatus;
            remarks: string | null;
            sessionId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        attendanceRecordId: string;
        newStatus: import("@prisma/client").$Enums.AttendanceStatus;
        reason: string;
        reviewNotes: string | null;
        requestedById: string;
        oldStatus: import("@prisma/client").$Enums.AttendanceStatus;
        approvalStatus: import("@prisma/client").$Enums.CorrectionStatus;
        reviewedById: string | null;
        reviewedAt: Date | null;
    }>;
    getPendingCorrections(): Promise<({
        attendanceRecord: {
            student: {
                user: {
                    firstName: string;
                    lastName: string;
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
            session: {
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
                subject: {
                    id: string;
                    createdAt: Date;
                    name: string;
                    departmentId: string | null;
                    code: string;
                    isElective: boolean;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                academicYearId: string;
                classId: string;
                sectionId: string;
                teacherId: string;
                subjectId: string;
                periodNumber: number;
                status: import("@prisma/client").$Enums.SessionStatus;
                remarks: string | null;
                date: Date;
                isFinalized: boolean;
                finalizedAt: Date | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            studentId: string;
            status: import("@prisma/client").$Enums.AttendanceStatus;
            remarks: string | null;
            sessionId: string;
        };
        requestedBy: {
            email: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        attendanceRecordId: string;
        newStatus: import("@prisma/client").$Enums.AttendanceStatus;
        reason: string;
        reviewNotes: string | null;
        requestedById: string;
        oldStatus: import("@prisma/client").$Enums.AttendanceStatus;
        approvalStatus: import("@prisma/client").$Enums.CorrectionStatus;
        reviewedById: string | null;
        reviewedAt: Date | null;
    })[]>;
    reviewCorrection(user: AuthenticatedUser, id: string, dto: ReviewCorrectionDto): Promise<{
        request: {
            id: string;
            createdAt: Date;
            attendanceRecordId: string;
            newStatus: import("@prisma/client").$Enums.AttendanceStatus;
            reason: string;
            reviewNotes: string | null;
            requestedById: string;
            oldStatus: import("@prisma/client").$Enums.AttendanceStatus;
            approvalStatus: import("@prisma/client").$Enums.CorrectionStatus;
            reviewedById: string | null;
            reviewedAt: Date | null;
        };
        message: string;
    }>;
    getMySummary(user: AuthenticatedUser, academicYearId?: string): Promise<{
        totalPeriods: number;
        presentPeriods: number;
        absentPeriods: number;
        overallPercentage: number;
        subjectBreakdown: {
            subjectId: string;
            name: string;
            code: string;
            totalPeriods: number;
            attendedPeriods: number;
            percentage: number;
        }[];
        recentRecords: {
            id: string;
            date: Date;
            periodNumber: number;
            subject: string;
            status: import("@prisma/client").$Enums.AttendanceStatus;
        }[];
    }>;
    getClassReport(classId: string, sectionId: string, academicYearId: string, startDate?: string, endDate?: string): Promise<{
        totalSessions: number;
        totalMarksRecorded: number;
        averageAttendance: number;
        sessionsCount: number;
    }>;
}
