import { ApiProperty } from '@nestjs/swagger';

import { IsNumber } from 'class-validator';
import { ExerciseGroup } from '../domain/exercise-group';

export class ExerciseGroupDto implements ExerciseGroup {
  @ApiProperty()
  @IsNumber()
  id: number;
}
