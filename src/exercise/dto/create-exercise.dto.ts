import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, Length } from 'class-validator';
import { exerciseGroupsEnumTransformer } from 'src/_utils/transformers/exercise-group-enum.transtormer';
import { ExerciseGroup } from 'src/exercise-group/domain/exercise-group';
import { ReadableExerciseGroupEnum } from 'src/exercise-group/exercise-group.enum';

export class CreateExerciseDto {
  @ApiProperty({ example: 'Приседания со штангой' })
  @IsNotEmpty()
  @Length(0, 200)
  name: string;

  @ApiProperty({
    example:
      'Приседания со штангой — это базовое функциональное движение, необходимое как для атлетов, так и для тех, кто просто хочет быть здоровым.',
  })
  @IsNotEmpty()
  @Length(0, 500)
  description: string;

  @ApiProperty({ enum: ReadableExerciseGroupEnum, isArray: true })
  @Transform(exerciseGroupsEnumTransformer)
  @IsArray()
  @ArrayNotEmpty()
  exerciseGroups: ExerciseGroup[];
}
