var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
export class CreateTimetableSlotDto {
    academicYearId;
    classId;
    sectionId;
    subjectId;
    teacherId;
    dayOfWeek;
    periodNumber;
    startTime;
    endTime;
}
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateTimetableSlotDto.prototype, "academicYearId", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateTimetableSlotDto.prototype, "classId", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateTimetableSlotDto.prototype, "sectionId", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateTimetableSlotDto.prototype, "subjectId", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateTimetableSlotDto.prototype, "teacherId", void 0);
__decorate([
    ApiProperty({ example: 1, description: '1 = Monday, 2 = Tuesday, ..., 6 = Saturday' }),
    IsInt(),
    Min(1),
    Max(6),
    __metadata("design:type", Number)
], CreateTimetableSlotDto.prototype, "dayOfWeek", void 0);
__decorate([
    ApiProperty({ example: 1, description: 'Period 1 to 8' }),
    IsInt(),
    Min(1),
    Max(8),
    __metadata("design:type", Number)
], CreateTimetableSlotDto.prototype, "periodNumber", void 0);
__decorate([
    ApiProperty({ example: '08:30' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateTimetableSlotDto.prototype, "startTime", void 0);
__decorate([
    ApiProperty({ example: '09:15' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateTimetableSlotDto.prototype, "endTime", void 0);
//# sourceMappingURL=timetable.dto.js.map