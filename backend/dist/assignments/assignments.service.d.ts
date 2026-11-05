import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAssignmentDto, SubmitAssignmentDto, ReviewSubmissionDto } from './dto/assignment.dto.js';
export declare class AssignmentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createAssignment(teacherProfileId: string, dto: CreateAssignmentDto): Promise<{
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
        attachments: {
            id: string;
            createdAt: Date;
            resourceType: string;
            fileUrl: string;
            publicId: string;
            fileName: string;
            fileSize: number | null;
            mimeType: string | null;
            assignmentId: string;
        }[];
    } & {
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        academicYearId: string;
        classId: string;
        sectionId: string;
        teacherId: string;
        subjectId: string;
        instructions: string | null;
        dueDate: Date;
        maxMarks: import("@prisma/client/runtime/library").Decimal;
        isSubmissionEnabled: boolean;
    }>;
    getAssignments(classId?: string, sectionId?: string, subjectId?: string, teacherProfileId?: string, studentProfileId?: string): Promise<({
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
        attachments: {
            id: string;
            createdAt: Date;
            resourceType: string;
            fileUrl: string;
            publicId: string;
            fileName: string;
            fileSize: number | null;
            mimeType: string | null;
            assignmentId: string;
        }[];
        submissions: (({
            review: {
                id: string;
                teacherId: string;
                reviewedAt: Date;
                marksObtained: import("@prisma/client/runtime/library").Decimal | null;
                feedback: string | null;
                submissionId: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            resourceType: string;
            studentId: string;
            status: import("@prisma/client").$Enums.AssignmentSubmissionStatus;
            fileUrl: string | null;
            submissionText: string | null;
            filePublicId: string | null;
            assignmentId: string;
            submittedAt: Date | null;
            isLate: boolean;
        }) | {
            id: string;
            status: import("@prisma/client").$Enums.AssignmentSubmissionStatus;
        })[];
    } & {
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        academicYearId: string;
        classId: string;
        sectionId: string;
        teacherId: string;
        subjectId: string;
        instructions: string | null;
        dueDate: Date;
        maxMarks: import("@prisma/client/runtime/library").Decimal;
        isSubmissionEnabled: boolean;
    })[]>;
    getAssignmentById(id: string, studentProfileId?: string): Promise<{
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
        attachments: {
            id: string;
            createdAt: Date;
            resourceType: string;
            fileUrl: string;
            publicId: string;
            fileName: string;
            fileSize: number | null;
            mimeType: string | null;
            assignmentId: string;
        }[];
        submissions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            resourceType: string;
            studentId: string;
            status: import("@prisma/client").$Enums.AssignmentSubmissionStatus;
            fileUrl: string | null;
            submissionText: string | null;
            filePublicId: string | null;
            assignmentId: string;
            submittedAt: Date | null;
            isLate: boolean;
        }[];
    } & {
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        academicYearId: string;
        classId: string;
        sectionId: string;
        teacherId: string;
        subjectId: string;
        instructions: string | null;
        dueDate: Date;
        maxMarks: import("@prisma/client/runtime/library").Decimal;
        isSubmissionEnabled: boolean;
    }>;
    startAssignment(assignmentId: string, studentProfileId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        resourceType: string;
        studentId: string;
        status: import("@prisma/client").$Enums.AssignmentSubmissionStatus;
        fileUrl: string | null;
        submissionText: string | null;
        filePublicId: string | null;
        assignmentId: string;
        submittedAt: Date | null;
        isLate: boolean;
    }>;
    submitAssignment(assignmentId: string, studentProfileId: string, dto: SubmitAssignmentDto): Promise<{
        assignment: {
            title: string;
            dueDate: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        resourceType: string;
        studentId: string;
        status: import("@prisma/client").$Enums.AssignmentSubmissionStatus;
        fileUrl: string | null;
        submissionText: string | null;
        filePublicId: string | null;
        assignmentId: string;
        submittedAt: Date | null;
        isLate: boolean;
    }>;
    getAssignmentSubmissions(assignmentId: string, teacherProfileId: string): Promise<({
        student: {
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
            admissionNumber: string;
            rollNumber: string | null;
            dateOfBirth: Date | null;
            gender: string | null;
            guardianName: string | null;
            guardianPhone: string | null;
            bloodGroup: string | null;
            address: string | null;
        };
        review: {
            id: string;
            teacherId: string;
            reviewedAt: Date;
            marksObtained: import("@prisma/client/runtime/library").Decimal | null;
            feedback: string | null;
            submissionId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        resourceType: string;
        studentId: string;
        status: import("@prisma/client").$Enums.AssignmentSubmissionStatus;
        fileUrl: string | null;
        submissionText: string | null;
        filePublicId: string | null;
        assignmentId: string;
        submittedAt: Date | null;
        isLate: boolean;
    })[]>;
    reviewSubmission(submissionId: string, teacherProfileId: string, dto: ReviewSubmissionDto): Promise<{
        review: {
            id: string;
            teacherId: string;
            reviewedAt: Date;
            marksObtained: import("@prisma/client/runtime/library").Decimal | null;
            feedback: string | null;
            submissionId: string;
        };
        message: string;
    }>;
}
