import { AllocationsService } from './allocations.service.js';
import { CreateAllocationDto } from './dto/allocation.dto.js';
export declare class AllocationsController {
    private readonly allocationsService;
    constructor(allocationsService: AllocationsService);
    getAllocations(academicYearId?: string, teacherId?: string, classId?: string, sectionId?: string): Promise<({
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
    } & {
        id: string;
        createdAt: Date;
        academicYearId: string;
        classId: string;
        sectionId: string;
        teacherId: string;
        subjectId: string;
    })[]>;
    createAllocation(dto: CreateAllocationDto): Promise<{
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
    } & {
        id: string;
        createdAt: Date;
        academicYearId: string;
        classId: string;
        sectionId: string;
        teacherId: string;
        subjectId: string;
    }>;
    deleteAllocation(id: string): Promise<{
        id: string;
        createdAt: Date;
        academicYearId: string;
        classId: string;
        sectionId: string;
        teacherId: string;
        subjectId: string;
    }>;
}
