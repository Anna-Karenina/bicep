import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Exercise } from '../domain/Exercise';

export class FilterExerciseDto {}

export class SortExerciseDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Exercise;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryExerciseDto {
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
    value ? plainToInstance(FilterExerciseDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterExerciseDto)
  filters?: FilterExerciseDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortExerciseDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortExerciseDto)
  sort?: SortExerciseDto[] | null;
}
