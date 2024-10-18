import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Trainer } from '../domain/trainer';

export class FilterTrainerDto {}

export class SortTrainerDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Trainer;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryTrainerDto {
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
    value ? plainToInstance(FilterTrainerDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterTrainerDto)
  filters?: FilterTrainerDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortTrainerDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortTrainerDto)
  sort?: SortTrainerDto[] | null;
}
