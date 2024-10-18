import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseStepEntity } from '../entities/exercise-step.entity';
import { ExerciseStep } from 'src/exercise-step/domain/exercise-step';
import { ExerciseStepMapper } from '../mappers/exercise-step.mapper';
import { WorkoutEntity } from 'src/workout/repository/entities/workout.entity';
import { WorkoutMapper } from 'src/workout/repository/mappers/workout.mapper';

@Injectable()
export class ExerciseStepRepository {
  constructor(
    @InjectRepository(WorkoutEntity)
    private readonly workoutRepository: Repository<WorkoutEntity>,
    @InjectRepository(ExerciseStepEntity)
    private readonly exerciseStepRepository: Repository<ExerciseStepEntity>,
  ) {}

  async create(data: ExerciseStep): Promise<ExerciseStep> {
    const workoutEntity = await this.workoutRepository.findOne({
      where: { id: data.workout.id },
    });
    const workout = WorkoutMapper.toDomain(workoutEntity);
    const persistenceModel = ExerciseStepMapper.toPersistence({
      ...data,
      workout,
    });

    const newEntity = await this.exerciseStepRepository.save(
      this.exerciseStepRepository.create(persistenceModel),
    );
    return ExerciseStepMapper.toDomain(newEntity);
  }
}
