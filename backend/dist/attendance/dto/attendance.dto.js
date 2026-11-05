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
import { IsArray, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, ValidateNested, } from 'class-validator';
import { Type } from 'class-transformer';
import { AttendanceStatus, CorrectionStatus } from '@prisma/client';
export class StudentAttendanceItemDto {
    studentId;
    status;
    remarks;
}
__decorate([
    ApiProperty({ description: 'StudentProfile ID' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], StudentAttendanceItemDto.prototype, "studentId", void 0);
__decorate([
    ApiProperty({ enum: AttendanceStatus, example: AttendanceStatus.PRESENT }),
    IsEnum(AttendanceStatus),
    __metadata("design:type", String)
], StudentAttendanceItemDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Medical leave' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], StudentAttendanceItemDto.prototype, "remarks", void 0);
export class SubmitAttendanceDto {
    academicYearId;
    classId;
    sectionId;
    subjectId;
    date;
    periodNumber;
    remarks;
    records;
}
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], SubmitAttendanceDto.prototype, "academicYearId", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], SubmitAttendanceDto.prototype, "classId", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], SubmitAttendanceDto.prototype, "sectionId", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], SubmitAttendanceDto.prototype, "subjectId", void 0);
__decorate([
    ApiProperty({ example: '2026-11-03' }),
    IsDateString(),
    __metadata("design:type", String)
], SubmitAttendanceDto.prototype, "date", void 0);
__decorate([
    ApiProperty({ example: 1, description: 'Period number 1 to 8' }),
    IsInt(),
    Min(1),
    Max(8),
    __metadata("design:type", Number)
], SubmitAttendanceDto.prototype, "periodNumber", void 0);
__decorate([
    ApiPropertyOptional(),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], SubmitAttendanceDto.prototype, "remarks", void 0);
__decorate([
    ApiProperty({ type: [StudentAttendanceItemDto] }),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => StudentAttendanceItemDto),
    __metadata("design:type", Array)
], SubmitAttendanceDto.prototype, "records", void 0);
export class RequestCorrectionDto {
    attendanceRecordId;
    newStatus;
    reason;
}
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], RequestCorrectionDto.prototype, "attendanceRecordId", void 0);
__decorate([
    ApiProperty({ enum: AttendanceStatus }),
    IsEnum(AttendanceStatus),
    __metadata("design:type", String)
], RequestCorrectionDto.prototype, "newStatus", void 0);
__decorate([
    ApiProperty({ example: 'Student arrived late due to school bus delay.' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], RequestCorrectionDto.prototype, "reason", void 0);
export class ReviewCorrectionDto {
    decision;
    reviewNotes;
}
__decorate([
    ApiProperty({ enum: [CorrectionStatus.APPROVED, CorrectionStatus.REJECTED] }),
    IsEnum(CorrectionStatus),
    __metadata("design:type", String)
], ReviewCorrectionDto.prototype, "decision", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Approved after verification with transport coordinator.' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], ReviewCorrectionDto.prototype, "reviewNotes", void 0);
//# sourceMappingURL=attendance.dto.js.map