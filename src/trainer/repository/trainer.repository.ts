import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/_utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/_utils/types/pagination-options';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from 'src/_utils/types/nullable.type';
import { User } from 'src/user/domain/user';
import { TrainerEntity } from './entities/trainer.entity';
import { Trainer } from '../domain/trainer';
import { TrainerMapper } from './mappers/trainer.mapper';
import { FilterTrainerDto, SortTrainerDto } from '../dto/query-trainer.dto';

@Injectable()
export class TrainerRepository {
  constructor(
    @InjectRepository(TrainerEntity)
    private readonly trainerRepository: Repository<TrainerEntity>,
  ) {}

  async create(data: Trainer): Promise<Trainer> {
    const persistenceModel = TrainerMapper.toPersistence(data);

    const newEntity = await this.trainerRepository.save(
      this.trainerRepository.create(persistenceModel),
    );

    return TrainerMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTrainerDto | null;
    sortOptions?: SortTrainerDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Trainer[]> {
    const where: FindOptionsWhere<TrainerEntity> = {};

    const entities = await this.trainerRepository.find({
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

    return entities.map((user) => TrainerMapper.toDomain(user));
  }

  async findOne(
    fields: EntityCondition<Trainer>,
  ): Promise<NullableType<Trainer>> {
    const entity = await this.trainerRepository.findOne({
      where: fields as FindOptionsWhere<TrainerEntity>,
      relations: {
        user: true,
      },
    });
    console.log(entity);

    if (!entity) {
      throw new NotFoundException();
    }

    return TrainerMapper.toDomain(entity);
  }

  async update(id: User['id'], payload: Partial<Trainer>): Promise<Trainer> {
    const entity = await this.trainerRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Trainer not found');
    }

    const updatedEntity = await this.trainerRepository.save(
      this.trainerRepository.create(
        TrainerMapper.toPersistence({
          ...TrainerMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return TrainerMapper.toDomain(updatedEntity);
  }

  async softDelete(id: Trainer['id']): Promise<void> {
    await this.trainerRepository.softDelete(id);
  }

  async findTrainerByUserId(id: User['id']): Promise<Trainer> {
    return await this.trainerRepository.findOne({
      where: { user: { id: Number(id) } },
    });
  }
}
