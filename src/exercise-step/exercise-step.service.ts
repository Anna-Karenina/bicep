import { Injectable } from '@nestjs/common';

import { CreateExerciseStepDto } from './dto/create-exercise-step.dto';
import { ExerciseStep } from './domain/exercise-step';
import { ExerciseStepRepository } from './repository/repositories/exercise-step.repository';
import { Workout } from 'src/workout/domain/workout';

@Injectable()
export class ExerciseStepService {
  constructor(
    private readonly exerciseStepRepository: ExerciseStepRepository,
  ) {}

  async create(
    createExerciseStepDto: CreateExerciseStepDto,
  ): Promise<ExerciseStep> {
    const exerciseStep = new ExerciseStep();
    const workout = new Workout();
    workout.id = createExerciseStepDto.workoutId;

    exerciseStep.amount = createExerciseStepDto.amount;
    exerciseStep.exerciseId = createExerciseStepDto.exerciseId;
    exerciseStep.repeat_quantity = createExerciseStepDto.repeat_quantity;
    exerciseStep.weight = createExerciseStepDto.repeat_quantity;
    exerciseStep.workout = workout;
    return this.exerciseStepRepository.create(exerciseStep);
  }
}
