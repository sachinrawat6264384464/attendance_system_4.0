export declare class AuthenticatedUser {
    userId: string;
    email: string;
    roles: string[];
    mustChangePassword?: boolean;
    teacherProfileId?: string;
    studentProfileId?: string;
    departmentId?: string;
}
export declare const CurrentUser: (...dataOrPipes: (keyof AuthenticatedUser | import("@nestjs/common").ParameterDecoratorOptions | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;
