import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateTimetableSlotDto {
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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  teacherId: string;

  @ApiProperty({ example: 1, description: '1 = Monday, 2 = Tuesday, ..., 6 = Saturday' })
  @IsInt()
  @Min(1)
  @Max(6)
  dayOfWeek: number;

  @ApiProperty({ example: 1, description: 'Period 1 to 8' })
  @IsInt()
  @Min(1)
  @Max(8)
  periodNumber: number;

  @ApiProperty({ example: '08:30' })
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ example: '09:15' })
  @IsString()
  @IsNotEmpty()
  endTime: string;
}

