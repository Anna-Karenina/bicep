import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Not, Repository } from 'typeorm';

import { ExerciseEntity } from '../entities/exercise.entity';
import { Exercise } from 'src/exercise/domain/exercise';
import { ExerciseMapper } from '../mappers/exercise.mapper';
import { EntityCondition } from 'src/_utils/types/entity-condition.type';
import {
  FilterExerciseDto,
  SortExerciseDto,
} from 'src/exercise/dto/query-exercise.dto';
import { IPaginationOptions } from 'src/_utils/types/pagination-options';

@Injectable()
export class ExerciseRepository {
  constructor(
    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>,
  ) {}

  async create(data: Exercise): Promise<Exercise> {
    const persistenceModel = ExerciseMapper.toPersistence(data);

    const newEntity = await this.exerciseRepository.save(
      this.exerciseRepository.create(persistenceModel),
    );

    return ExerciseMapper.toDomain(newEntity);
  }

  async findOne(options: EntityCondition<Exercise>): Promise<Exercise> {
    const entity = await this.exerciseRepository.findOne({
      where: options as unknown as FindOptionsWhere<ExerciseEntity>,
    });
    console.log(entity);

    return entity ? ExerciseMapper.toDomain(entity) : null;
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterExerciseDto | null;
    sortOptions?: SortExerciseDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Exercise[]> {
    const where: FindOptionsWhere<ExerciseEntity> = {};

    const entities = await this.exerciseRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((exercise) => ExerciseMapper.toDomain(exercise));
  }

  async update(exercise: Exercise): Promise<Exercise | PromiseLike<Exercise>> {
   const updatedEntity = await this.exerciseRepository.save(
    this.exerciseRepository.create(exercise)
  );
  return ExerciseMapper.toDomain(updatedEntity);
  }
}
