import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AttachmentItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fileUrl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  publicId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  fileSize?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  mimeType?: string;

  @ApiPropertyOptional({ default: 'auto' })
  @IsString()
  @IsOptional()
  resourceType?: string;
}

export class CreateAssignmentDto {
  @ApiProperty({ example: 'Quadratic Equations Practice Problem Set' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Complete exercises 4.1 to 4.3 from Chapter 4.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ example: 'Show full step-by-step working. Late submissions lose 10%.' })
  @IsString()
  @IsOptional()
  instructions?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  classId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sectionId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  academicYearId: string;

  @ApiProperty({ example: '2026-11-15T23:59:59Z' })
  @IsDateString()
  dueDate: string;

  @ApiPropertyOptional({ example: 100 })
  @IsNumber()
  @IsOptional()
  maxMarks?: number;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isSubmissionEnabled?: boolean;

  @ApiPropertyOptional({ type: [AttachmentItemDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AttachmentItemDto)
  attachments?: AttachmentItemDto[];
}

export class SubmitAssignmentDto {
  @ApiPropertyOptional({ example: 'Attached is my scanned PDF homework.' })
  @IsString()
  @IsOptional()
  submissionText?: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/apex/image/upload/v123/sub.pdf' })
  @IsString()
  @IsOptional()
  fileUrl?: string;

  @ApiPropertyOptional({ example: 'apex_school_system/submissions/sub_123' })
  @IsString()
  @IsOptional()
  filePublicId?: string;

  @ApiPropertyOptional({ default: 'auto' })
  @IsString()
  @IsOptional()
  resourceType?: string;
}

export class ReviewSubmissionDto {
  @ApiProperty({ example: 95.0 })
  @IsNumber()
  marksObtained: number;

  @ApiPropertyOptional({ example: 'Excellent derivation of the quadratic formula.' })
  @IsString()
  @IsOptional()
  feedback?: string;
}

