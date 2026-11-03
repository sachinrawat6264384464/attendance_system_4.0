import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsArray,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTeacherDto {
  @ApiProperty({ example: 'rajesh.sharma@apexschool.edu' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Rajesh' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Sharma' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'EMP-T-101' })
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @ApiPropertyOptional({ example: '+91 98765 11223' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'M.Sc. Mathematics, B.Ed.' })
  @IsString()
  @IsOptional()
  qualification?: string;

  @ApiPropertyOptional({ example: 'Calculus & Algebra' })
  @IsString()
  @IsOptional()
  specialization?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  departmentId?: string;

  @ApiPropertyOptional({ example: 'TeacherTemp@123' })
  @IsString()
  @IsOptional()
  @MinLength(6)
  temporaryPassword?: string;
}

export class CreateStudentDto {
  @ApiProperty({ example: 'aarav.kumar@student.apexschool.edu' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Aarav' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Kumar' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'ADM-2026-001' })
  @IsString()
  @IsNotEmpty()
  admissionNumber: string;

  @ApiProperty({ example: '10' })
  @IsString()
  @IsOptional()
  rollNumber?: string;

  @ApiProperty({ example: 'class-uuid-here' })
  @IsString()
  @IsNotEmpty()
  classId: string;

  @ApiProperty({ example: 'section-uuid-here' })
  @IsString()
  @IsNotEmpty()
  sectionId: string;

  @ApiProperty({ example: 'academic-year-uuid-here' })
  @IsString()
  @IsNotEmpty()
  academicYearId: string;

  @ApiPropertyOptional({ example: '2010-05-15' })
  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiPropertyOptional({ example: 'Male' })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiPropertyOptional({ example: 'Vikram Kumar' })
  @IsString()
  @IsOptional()
  guardianName?: string;

  @ApiPropertyOptional({ example: '+91 98765 99887' })
  @IsString()
  @IsOptional()
  guardianPhone?: string;

  @ApiPropertyOptional({ example: 'StudentTemp@123' })
  @IsString()
  @IsOptional()
  @MinLength(6)
  temporaryPassword?: string;
}

export class BulkStudentImportDto {
  @ApiProperty({ type: [CreateStudentDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateStudentDto)
  students: CreateStudentDto[];
}

