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
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsBoolean, IsInt, Min } from 'class-validator';
export class CreateAcademicYearDto {
    name;
    startDate;
    endDate;
    isCurrent;
}
__decorate([
    ApiProperty({ example: '2026-2027' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateAcademicYearDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ example: '2026-04-01' }),
    IsDateString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateAcademicYearDto.prototype, "startDate", void 0);
__decorate([
    ApiProperty({ example: '2027-03-31' }),
    IsDateString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateAcademicYearDto.prototype, "endDate", void 0);
__decorate([
    ApiPropertyOptional({ default: false }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], CreateAcademicYearDto.prototype, "isCurrent", void 0);
export class CreateDepartmentDto {
    name;
    code;
    hodId;
}
__decorate([
    ApiProperty({ example: 'Science' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ example: 'SCI' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "code", void 0);
__decorate([
    ApiPropertyOptional(),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "hodId", void 0);
export class CreateClassDto {
    name;
    numericOrder;
}
__decorate([
    ApiProperty({ example: 'Grade 10' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateClassDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ example: 10 }),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateClassDto.prototype, "numericOrder", void 0);
export class CreateSectionDto {
    classId;
    name;
    roomNumber;
}
__decorate([
    ApiProperty({ example: 'class-uuid-here' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateSectionDto.prototype, "classId", void 0);
__decorate([
    ApiProperty({ example: 'A' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateSectionDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Room 204' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateSectionDto.prototype, "roomNumber", void 0);
export class CreateSubjectDto {
    name;
    code;
    departmentId;
    isElective;
}
__decorate([
    ApiProperty({ example: 'Mathematics' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ example: 'MATH-10' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "code", void 0);
__decorate([
    ApiPropertyOptional(),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "departmentId", void 0);
__decorate([
    ApiPropertyOptional({ default: false }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], CreateSubjectDto.prototype, "isElective", void 0);
//# sourceMappingURL=academics.dto.js.map