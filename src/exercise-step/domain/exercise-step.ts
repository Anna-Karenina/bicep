import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Workout } from 'src/workout/domain/workout';

export class ExerciseStep {
  @ApiProperty({ example: '1' })
  id: number;

  @ApiProperty({ example: '80' })
  weight: number;
  @ApiProperty({ example: '2' })
  repeat_quantity: number;
  @ApiProperty({ example: '40' })
  amount: number;
  @ApiProperty({ example: '1' })
  exerciseId: number;

  @ApiProperty({ type: () => Workout })
  workout: Workout;

  @Expose({ groups: ['admin'] })
  createdAt: Date;
  @Expose({ groups: ['admin'] })
  updatedAt: Date;
  @Expose({ groups: ['admin'] })
  deletedAt: Date;
}
