import { TimetableService } from './timetable.service.js';
import { CreateTimetableSlotDto } from './dto/timetable.dto.js';
import { AuthenticatedUser } from '../common/decorators/current-user.decorator.js';
export declare class TimetableController {
    private readonly timetableService;
    constructor(timetableService: TimetableService);
    createSlot(dto: CreateTimetableSlotDto): Promise<{
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
    } & {
        id: string;
        createdAt: Date;
        academicYearId: string;
        classId: string;
        sectionId: string;
        teacherId: string;
        subjectId: string;
        dayOfWeek: number;
        periodNumber: number;
        startTime: string;
        endTime: string;
    }>;
    getSectionTimetable(classId: string, sectionId: string, academicYearId?: string): Promise<({
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
    } & {
        id: string;
        createdAt: Date;
        academicYearId: string;
        classId: string;
        sectionId: string;
        teacherId: string;
        subjectId: string;
        dayOfWeek: number;
        periodNumber: number;
        startTime: string;
        endTime: string;
    })[]>;
    getMySchedule(user: AuthenticatedUser, academicYearId?: string): Promise<({
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
        academicYearId: string;
        classId: string;
        sectionId: string;
        teacherId: string;
        subjectId: string;
        dayOfWeek: number;
        periodNumber: number;
        startTime: string;
        endTime: string;
    })[]>;
    getStudentSchedule(user: AuthenticatedUser, academicYearId?: string): Promise<({
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
    } & {
        id: string;
        createdAt: Date;
        academicYearId: string;
        classId: string;
        sectionId: string;
        teacherId: string;
        subjectId: string;
        dayOfWeek: number;
        periodNumber: number;
        startTime: string;
        endTime: string;
    })[]>;
    deleteSlot(id: string): Promise<{
        id: string;
        createdAt: Date;
        academicYearId: string;
        classId: string;
        sectionId: string;
        teacherId: string;
        subjectId: string;
        dayOfWeek: number;
        periodNumber: number;
        startTime: string;
        endTime: string;
    }>;
}
