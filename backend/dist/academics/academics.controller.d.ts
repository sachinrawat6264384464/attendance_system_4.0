import { AcademicsService } from './academics.service.js';
import { CreateAcademicYearDto, CreateClassDto, CreateSectionDto, CreateSubjectDto, CreateDepartmentDto } from './dto/academics.dto.js';
export declare class AcademicsController {
    private readonly academicsService;
    constructor(academicsService: AcademicsService);
    getAcademicYears(): Promise<({
        semesters: {
            id: string;
            createdAt: Date;
            name: string;
            academicYearId: string;
            startDate: Date;
            endDate: Date;
            isCurrent: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        startDate: Date;
        endDate: Date;
        isCurrent: boolean;
    })[]>;
    getCurrentYear(): Promise<({
        semesters: {
            id: string;
            createdAt: Date;
            name: string;
            academicYearId: string;
            startDate: Date;
            endDate: Date;
            isCurrent: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        startDate: Date;
        endDate: Date;
        isCurrent: boolean;
    }) | null>;
    createAcademicYear(dto: CreateAcademicYearDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        startDate: Date;
        endDate: Date;
        isCurrent: boolean;
    }>;
    getDepartments(): Promise<({
        _count: {
            teacherProfiles: number;
            subjects: number;
        };
        hod: {
            email: string;
            id: string;
            firstName: string;
            lastName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        name: string;
        code: string;
        hodId: string | null;
    })[]>;
    createDepartment(dto: CreateDepartmentDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        code: string;
        hodId: string | null;
    }>;
    getClasses(): Promise<({
        sections: ({
            _count: {
                studentEnrollments: number;
            };
        } & {
            id: string;
            createdAt: Date;
            name: string;
            classId: string;
            roomNumber: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        numericOrder: number;
    })[]>;
    createClass(dto: CreateClassDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        numericOrder: number;
    }>;
    createSection(dto: CreateSectionDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        classId: string;
        roomNumber: string | null;
    }>;
    getSubjects(departmentId?: string): Promise<({
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
        name: string;
        departmentId: string | null;
        code: string;
        isElective: boolean;
    })[]>;
    createSubject(dto: CreateSubjectDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        departmentId: string | null;
        code: string;
        isElective: boolean;
    }>;
}
