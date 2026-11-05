var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsArray, ValidateNested, IsDateString, } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateTeacherDto {
    email;
    firstName;
    lastName;
    employeeId;
    phone;
    qualification;
    specialization;
    departmentId;
    temporaryPassword;
}
__decorate([
    ApiProperty({ example: 'rajesh.sharma@apexschool.edu' }),
    IsEmail(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ example: 'Rajesh' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "firstName", void 0);
__decorate([
    ApiProperty({ example: 'Sharma' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "lastName", void 0);
__decorate([
    ApiProperty({ example: 'EMP-T-101' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "employeeId", void 0);
__decorate([
    ApiPropertyOptional({ example: '+91 98765 11223' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional({ example: 'M.Sc. Mathematics, B.Ed.' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "qualification", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Calculus & Algebra' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "specialization", void 0);
__decorate([
    ApiPropertyOptional(),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "departmentId", void 0);
__decorate([
    ApiPropertyOptional({ example: 'TeacherTemp@123' }),
    IsString(),
    IsOptional(),
    MinLength(6),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "temporaryPassword", void 0);
export class CreateStudentDto {
    email;
    firstName;
    lastName;
    admissionNumber;
    rollNumber;
    classId;
    sectionId;
    academicYearId;
    dateOfBirth;
    gender;
    guardianName;
    guardianPhone;
    temporaryPassword;
}
__decorate([
    ApiProperty({ example: 'aarav.kumar@student.apexschool.edu' }),
    IsEmail(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ example: 'Aarav' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "firstName", void 0);
__decorate([
    ApiProperty({ example: 'Kumar' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "lastName", void 0);
__decorate([
    ApiProperty({ example: 'ADM-2026-001' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "admissionNumber", void 0);
__decorate([
    ApiProperty({ example: '10' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "rollNumber", void 0);
__decorate([
    ApiProperty({ example: 'class-uuid-here' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "classId", void 0);
__decorate([
    ApiProperty({ example: 'section-uuid-here' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "sectionId", void 0);
__decorate([
    ApiProperty({ example: 'academic-year-uuid-here' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "academicYearId", void 0);
__decorate([
    ApiPropertyOptional({ example: '2010-05-15' }),
    IsDateString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "dateOfBirth", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Male' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "gender", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Vikram Kumar' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "guardianName", void 0);
__decorate([
    ApiPropertyOptional({ example: '+91 98765 99887' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "guardianPhone", void 0);
__decorate([
    ApiPropertyOptional({ example: 'StudentTemp@123' }),
    IsString(),
    IsOptional(),
    MinLength(6),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "temporaryPassword", void 0);
export class BulkStudentImportDto {
    students;
}
__decorate([
    ApiProperty({ type: [CreateStudentDto] }),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => CreateStudentDto),
    __metadata("design:type", Array)
], BulkStudentImportDto.prototype, "students", void 0);
//# sourceMappingURL=users.dto.js.map