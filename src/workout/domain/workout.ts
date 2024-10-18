import { Gym } from 'src/gym/domain/gym';
import { Student } from 'src/student/domain/student';
import { Trainer } from 'src/trainer/domain/trainer';
import { WorkoutStatus } from '../emuns/status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ExerciseStep } from 'src/exercise-step/domain/exercise-step';

export class Workout {
  @ApiProperty({ example: '1' })
  id: number;

  @ApiProperty({ example: '1' })
  stardedAt?: Date;

  @ApiProperty({ example: '1' })
  endedAt?: Date;

  @ApiProperty({ enum: WorkoutStatus, isArray: true })
  status: WorkoutStatus;

  @ApiProperty({ type: Gym })
  gym?: Gym;

  @ApiProperty({ type: () => Student, isArray: true })
  students?: Student[] | null;

  @ApiProperty({ type: Trainer })
  trainer?: Trainer;

  @ApiProperty({ type: () => ExerciseStep, isArray: true })
  exercises?: ExerciseStep[] | null;

  @Expose({ groups: ['admin'] })
  createdAt: Date;
  @Expose({ groups: ['admin'] })
  updatedAt: Date;
  @Expose({ groups: ['admin'] })
  deletedAt: Date;
}
