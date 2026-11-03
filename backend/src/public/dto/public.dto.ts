import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAdmissionEnquiryDto {
  @ApiProperty({ example: 'Rohan Verma' })
  @IsString()
  @IsNotEmpty()
  studentName: string;

  @ApiProperty({ example: 'Suresh Verma' })
  @IsString()
  @IsNotEmpty()
  guardianName: string;

  @ApiProperty({ example: 'suresh.verma@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+91 98765 43210' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Grade 11 - Science' })
  @IsString()
  @IsNotEmpty()
  applyingForGrade: string;

  @ApiPropertyOptional({ example: 'Seeking admission for Academic Year 2026-2027.' })
  @IsString()
  @IsOptional()
  message?: string;
}

