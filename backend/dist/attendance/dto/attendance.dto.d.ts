import { AttendanceStatus, CorrectionStatus } from '@prisma/client';
export declare class StudentAttendanceItemDto {
    studentId: string;
    status: AttendanceStatus;
    remarks?: string;
}
export declare class SubmitAttendanceDto {
    academicYearId: string;
    classId: string;
    sectionId: string;
    subjectId: string;
    date: string;
    periodNumber: number;
    remarks?: string;
    records: StudentAttendanceItemDto[];
}
export declare class RequestCorrectionDto {
    attendanceRecordId: string;
    newStatus: AttendanceStatus;
    reason: string;
}
export declare class ReviewCorrectionDto {
    decision: CorrectionStatus;
    reviewNotes?: string;
}
