export declare class AttachmentItemDto {
    fileUrl: string;
    publicId: string;
    fileName: string;
    fileSize?: number;
    mimeType?: string;
    resourceType?: string;
}
export declare class CreateAssignmentDto {
    title: string;
    description: string;
    instructions?: string;
    subjectId: string;
    classId: string;
    sectionId: string;
    academicYearId: string;
    dueDate: string;
    maxMarks?: number;
    isSubmissionEnabled?: boolean;
    attachments?: AttachmentItemDto[];
}
export declare class SubmitAssignmentDto {
    submissionText?: string;
    fileUrl?: string;
    filePublicId?: string;
    resourceType?: string;
}
export declare class ReviewSubmissionDto {
    marksObtained: number;
    feedback?: string;
}
