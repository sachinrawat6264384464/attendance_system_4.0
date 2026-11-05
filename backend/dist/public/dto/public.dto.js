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
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateAdmissionEnquiryDto {
    studentName;
    guardianName;
    email;
    phone;
    applyingForGrade;
    message;
}
__decorate([
    ApiProperty({ example: 'Rohan Verma' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "studentName", void 0);
__decorate([
    ApiProperty({ example: 'Suresh Verma' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "guardianName", void 0);
__decorate([
    ApiProperty({ example: 'suresh.verma@example.com' }),
    IsEmail(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ example: '+91 98765 43210' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "phone", void 0);
__decorate([
    ApiProperty({ example: 'Grade 11 - Science' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "applyingForGrade", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Seeking admission for Academic Year 2026-2027.' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "message", void 0);
//# sourceMappingURL=public.dto.js.map