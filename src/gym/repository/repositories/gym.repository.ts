import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Not, Repository } from 'typeorm';

import { NullableType } from 'src/_utils/types/nullable.type';
import { EntityCondition } from 'src/_utils/types/entity-condition.type';
import { GymMapper } from '../mappers/gym.mapper';
import { GymEntity } from '../entities/gym.entity';
import { Gym } from 'src/gym/domain/gym';

@Injectable()
export class GymRepository {
  constructor(
    @InjectRepository(GymEntity)
    private readonly gymRepository: Repository<GymEntity>,
  ) {}

  async findOne(options: EntityCondition<Gym>): Promise<NullableType<Gym>> {
    const entity = await this.gymRepository.findOne({
      where: options as unknown as FindOptionsWhere<GymEntity>,
    });

    return entity ? GymMapper.toDomain(entity) : null;
  }

  async create(data: Gym): Promise<Gym> {
    const persistenceModel = GymMapper.toPersistence(data);
    return this.gymRepository.save(this.gymRepository.create(persistenceModel));
  }
}
