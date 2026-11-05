export declare class CreateAcademicYearDto {
    name: string;
    startDate: string;
    endDate: string;
    isCurrent?: boolean;
}
export declare class CreateDepartmentDto {
    name: string;
    code: string;
    hodId?: string;
}
export declare class CreateClassDto {
    name: string;
    numericOrder: number;
}
export declare class CreateSectionDto {
    classId: string;
    name: string;
    roomNumber?: string;
}
export declare class CreateSubjectDto {
    name: string;
    code: string;
    departmentId?: string;
    isElective?: boolean;
}
