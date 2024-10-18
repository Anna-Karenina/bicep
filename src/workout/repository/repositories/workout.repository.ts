import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Not, Repository } from 'typeorm';

import { NullableType } from 'src/_utils/types/nullable.type';
import { EntityCondition } from 'src/_utils/types/entity-condition.type';
import { Workout } from 'src/workout/domain/workout';
import { WorkoutEntity } from '../entities/workout.entity';
import { WorkoutMapper } from '../mappers/workout.mapper';

@Injectable()
export class WorkoutRepository {
  constructor(
    @InjectRepository(WorkoutEntity)
    private readonly workoutRepository: Repository<WorkoutEntity>,
  ) {}

  async findOne(
    options: EntityCondition<Workout>,
  ): Promise<NullableType<Workout>> {
    const entity = await this.workoutRepository.findOne({
      where: options as FindOptionsWhere<WorkoutEntity>,
      relations: {
        gym: true,
        students: true,
        trainer: true,
        exercises: true,
      },
    });
    console.log(entity);

    return entity ? WorkoutMapper.toDomain(entity) : null;
  }

  async create(data: Workout): Promise<Workout> {
    const persistenceModel = WorkoutMapper.toPersistence(data);

    const workoutEntity = await this.workoutRepository.save(
      this.workoutRepository.create(persistenceModel),
    );
    return WorkoutMapper.toDomain(workoutEntity);
  }

  async findByTrainer(id: any) {
    return await this.workoutRepository.find({
      where: {
        trainer: { id },
      },
    });
  }
}
