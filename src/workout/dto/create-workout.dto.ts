import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  isISO8601,
  IsISO8601,
  IsNotEmpty,
} from 'class-validator';

export class CreateWorkoutDto {
  @ApiProperty({ example: new Date().toISOString() })
  @IsISO8601({ strict: false, strictSeparator: false })
  @Transform(({ value }) => {
    console.log(value);

    const isValidDate = isISO8601(value, {
      strict: false,
      strictSeparator: false,
    });
    if (!isValidDate) {
      throw new BadRequestException(
        `Property "startedAt" should be a valid ISO8601 date string`,
      );
    }
    return value;
  })
  @IsNotEmpty()
  startedAt: Date;

  @ApiProperty({ example: new Date().setHours(new Date().getHours() + 1) })
  @IsISO8601({ strict: false, strictSeparator: false })
  @Transform(({ value }) => {
    const isValidDate = isISO8601(value, {
      strict: false,
      strictSeparator: false,
    });
    if (!isValidDate) {
      throw new BadRequestException(
        `Property "endedAt" should be a valid ISO8601 date string`,
      );
    }
    // return new Date(value);
    return value;
  })
  @IsNotEmpty()
  endedAt: Date;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  trainerId: number;

  @ApiProperty({ example: [1, 2, 3], description: 'List of studens ids' })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  studentsIds: number[];

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  gymId: number;
}
