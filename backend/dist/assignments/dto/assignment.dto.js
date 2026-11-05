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
import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, } from 'class-validator';
import { Type } from 'class-transformer';
export class AttachmentItemDto {
    fileUrl;
    publicId;
    fileName;
    fileSize;
    mimeType;
    resourceType;
}
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], AttachmentItemDto.prototype, "fileUrl", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], AttachmentItemDto.prototype, "publicId", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], AttachmentItemDto.prototype, "fileName", void 0);
__decorate([
    ApiPropertyOptional(),
    IsNumber(),
    IsOptional(),
    __metadata("design:type", Number)
], AttachmentItemDto.prototype, "fileSize", void 0);
__decorate([
    ApiPropertyOptional(),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], AttachmentItemDto.prototype, "mimeType", void 0);
__decorate([
    ApiPropertyOptional({ default: 'auto' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], AttachmentItemDto.prototype, "resourceType", void 0);
export class CreateAssignmentDto {
    title;
    description;
    instructions;
    subjectId;
    classId;
    sectionId;
    academicYearId;
    dueDate;
    maxMarks;
    isSubmissionEnabled;
    attachments;
}
__decorate([
    ApiProperty({ example: 'Quadratic Equations Practice Problem Set' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "title", void 0);
__decorate([
    ApiProperty({ example: 'Complete exercises 4.1 to 4.3 from Chapter 4.' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Show full step-by-step working. Late submissions lose 10%.' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "instructions", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "subjectId", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "classId", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "sectionId", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "academicYearId", void 0);
__decorate([
    ApiProperty({ example: '2026-11-15T23:59:59Z' }),
    IsDateString(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "dueDate", void 0);
__decorate([
    ApiPropertyOptional({ example: 100 }),
    IsNumber(),
    IsOptional(),
    __metadata("design:type", Number)
], CreateAssignmentDto.prototype, "maxMarks", void 0);
__decorate([
    ApiPropertyOptional({ default: true }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], CreateAssignmentDto.prototype, "isSubmissionEnabled", void 0);
__decorate([
    ApiPropertyOptional({ type: [AttachmentItemDto] }),
    IsArray(),
    IsOptional(),
    ValidateNested({ each: true }),
    Type(() => AttachmentItemDto),
    __metadata("design:type", Array)
], CreateAssignmentDto.prototype, "attachments", void 0);
export class SubmitAssignmentDto {
    submissionText;
    fileUrl;
    filePublicId;
    resourceType;
}
__decorate([
    ApiPropertyOptional({ example: 'Attached is my scanned PDF homework.' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], SubmitAssignmentDto.prototype, "submissionText", void 0);
__decorate([
    ApiPropertyOptional({ example: 'https://res.cloudinary.com/apex/image/upload/v123/sub.pdf' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], SubmitAssignmentDto.prototype, "fileUrl", void 0);
__decorate([
    ApiPropertyOptional({ example: 'apex_school_system/submissions/sub_123' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], SubmitAssignmentDto.prototype, "filePublicId", void 0);
__decorate([
    ApiPropertyOptional({ default: 'auto' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], SubmitAssignmentDto.prototype, "resourceType", void 0);
export class ReviewSubmissionDto {
    marksObtained;
    feedback;
}
__decorate([
    ApiProperty({ example: 95.0 }),
    IsNumber(),
    __metadata("design:type", Number)
], ReviewSubmissionDto.prototype, "marksObtained", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Excellent derivation of the quadratic formula.' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], ReviewSubmissionDto.prototype, "feedback", void 0);
//# sourceMappingURL=assignment.dto.js.map