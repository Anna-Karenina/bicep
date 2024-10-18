import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ExerciseStepService } from './exercise-step.service';
import { ExerciseStep } from './domain/exercise-step';
import { CreateExerciseStepDto } from './dto/create-exercise-step.dto';

@ApiTags('ExerciseStep')
@Controller({
  path: 'exercise-step',
  version: '1',
})
export class ExerciseStepController {
  constructor(private readonly exerciseStepService: ExerciseStepService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ExerciseStep,
  })
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createExerciseStepDto: CreateExerciseStepDto,
  ): Promise<ExerciseStep> {
    const a = {
      exerciseId: 7,
      workoutId: 12,
      weight: 80,
      repeat_quantity: 2,
      amount: 40,
    };
    return this.exerciseStepService.create(a);
  }
}
