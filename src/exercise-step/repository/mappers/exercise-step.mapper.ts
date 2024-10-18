import { WorkoutMapper } from 'src/workout/repository/mappers/workout.mapper';
import { ExerciseStepEntity } from '../entities/exercise-step.entity';
import { ExerciseStep } from 'src/exercise-step/domain/exercise-step';

export class ExerciseStepMapper {
  static toDomain(raw: ExerciseStepEntity): ExerciseStep {
    console.log(raw);
    const exerciseStep = new ExerciseStep();
    exerciseStep.amount = raw.amount;
    exerciseStep.createdAt = raw.createdAt;
    exerciseStep.deletedAt = raw.deletedAt;
    exerciseStep.exerciseId = raw.exerciseId;
    exerciseStep.id = raw.id;
    exerciseStep.repeat_quantity = raw.repeat_quantity;
    exerciseStep.updatedAt = raw.updatedAt;
    exerciseStep.weight = raw.weight;

    return exerciseStep;
  }

  static toPersistence(step: ExerciseStep): ExerciseStepEntity {
    const exerciseStepEntity = new ExerciseStepEntity();
    exerciseStepEntity.workout = WorkoutMapper.toPersistence(step.workout);

    exerciseStepEntity.amount = step.amount;
    exerciseStepEntity.createdAt = step.createdAt;
    exerciseStepEntity.deletedAt = step.deletedAt;
    exerciseStepEntity.exerciseId = step.exerciseId;
    exerciseStepEntity.id = step.id;
    exerciseStepEntity.repeat_quantity = step.repeat_quantity;
    exerciseStepEntity.updatedAt = step.updatedAt;
    exerciseStepEntity.weight = step.weight;
    return exerciseStepEntity;
  }
}
