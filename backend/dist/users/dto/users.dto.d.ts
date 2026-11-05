export declare class CreateTeacherDto {
    email: string;
    firstName: string;
    lastName: string;
    employeeId: string;
    phone?: string;
    qualification?: string;
    specialization?: string;
    departmentId?: string;
    temporaryPassword?: string;
}
export declare class CreateStudentDto {
    email: string;
    firstName: string;
    lastName: string;
    admissionNumber: string;
    rollNumber?: string;
    classId: string;
    sectionId: string;
    academicYearId: string;
    dateOfBirth?: string;
    gender?: string;
    guardianName?: string;
    guardianPhone?: string;
    temporaryPassword?: string;
}
export declare class BulkStudentImportDto {
    students: CreateStudentDto[];
}
