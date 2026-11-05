import { PrismaService } from '../prisma/prisma.service.js';
export declare class ReportsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getPrincipalDashboard(): Promise<{
        totalStudents: number;
        totalTeachers: number;
        totalClasses: number;
        totalSections: number;
        pendingCorrections: number;
        activeAssignments: number;
        todaySessionsCount: number;
        todayAttendancePercentage: number;
    }>;
    getHodDashboard(departmentId: string): Promise<{
        department: ({
            hod: {
                email: string;
                firstName: string;
                lastName: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            name: string;
            code: string;
            hodId: string | null;
        }) | null;
        facultyCount: number;
        subjects: ({
            _count: {
                teacherAllocations: number;
                assignments: number;
            };
        } & {
            id: string;
            createdAt: Date;
            name: string;
            departmentId: string | null;
            code: string;
            isElective: boolean;
        })[];
    }>;
}
