import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty } from 'class-validator';

export class CreateExerciseDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: ['legs', 'core'] })
  @IsArray()
  @ArrayNotEmpty()
  exerciseGroups: string[];
}
