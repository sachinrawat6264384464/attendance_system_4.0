import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AttendanceStatus, CorrectionStatus } from '@prisma/client';

export class StudentAttendanceItemDto {
  @ApiProperty({ description: 'StudentProfile ID' })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ enum: AttendanceStatus, example: AttendanceStatus.PRESENT })
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @ApiPropertyOptional({ example: 'Medical leave' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class SubmitAttendanceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  academicYearId: string;

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
  subjectId: string;

  @ApiProperty({ example: '2026-11-03' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 1, description: 'Period number 1 to 8' })
  @IsInt()
  @Min(1)
  @Max(8)
  periodNumber: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  remarks?: string;

  @ApiProperty({ type: [StudentAttendanceItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentAttendanceItemDto)
  records: StudentAttendanceItemDto[];
}

export class RequestCorrectionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  attendanceRecordId: string;

  @ApiProperty({ enum: AttendanceStatus })
  @IsEnum(AttendanceStatus)
  newStatus: AttendanceStatus;

  @ApiProperty({ example: 'Student arrived late due to school bus delay.' })
  @IsString()
  @IsNotEmpty()
  reason: string;
}

export class ReviewCorrectionDto {
  @ApiProperty({ enum: [CorrectionStatus.APPROVED, CorrectionStatus.REJECTED] })
  @IsEnum(CorrectionStatus)
  decision: CorrectionStatus;

  @ApiPropertyOptional({ example: 'Approved after verification with transport coordinator.' })
  @IsString()
  @IsOptional()
  reviewNotes?: string;
}

