import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseStepDto {
  @ApiProperty()
  exerciseId: number;

  @ApiProperty()
  workoutId: number;

  @ApiProperty({ example: '80' })
  weight: number;

  @ApiProperty({ example: '2' })
  repeat_quantity: number;

  @ApiProperty({ example: '40' })
  amount: number;
}
