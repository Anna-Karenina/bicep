import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Student } from '../domain/student';

export class FilterStudentDto {}

export class SortStudentDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Student;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryStudentDto {
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterStudentDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterStudentDto)
  filters?: FilterStudentDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortStudentDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortStudentDto)
  sort?: SortStudentDto[] | null;
}
