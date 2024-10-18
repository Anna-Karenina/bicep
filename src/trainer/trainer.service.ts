import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { Trainer } from './domain/trainer';
import { NullableType } from 'src/_utils/types/nullable.type';
import { EntityCondition } from 'src/_utils/types/entity-condition.type';
import { TrainerRepository } from './repository/trainer.repository';
import { UsersService } from 'src/user/users.service';
import { RoleDto } from 'src/roles/dto/role.dto';
import { FilterTrainerDto, SortTrainerDto } from './dto/query-trainer.dto';
import { IPaginationOptions } from 'src/_utils/types/pagination-options';

@Injectable()
export class TrainerService {
  constructor(
    private readonly trainerRepository: TrainerRepository,
    private readonly userService: UsersService,
  ) {}

  async create(createTrainerDto: CreateTrainerDto) {
    const role = new RoleDto();
    role.id = 2;
    const user = await this.userService.create({ ...createTrainerDto, role });
    const newUser = await this.userService.findOne({ id: user.id });

    const trainer = new Trainer();
    trainer.experience = createTrainerDto.experience;
    trainer.specilizes = createTrainerDto.specilizes;
    trainer.user = newUser;

    return await this.trainerRepository.create(trainer);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTrainerDto | null;
    sortOptions?: SortTrainerDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Trainer[]> {
    return this.trainerRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findOne(fields: EntityCondition<Trainer>): Promise<NullableType<Trainer>> {
    return this.trainerRepository.findOne(fields);
  }

  update(id: number, updateTrainerDto: UpdateTrainerDto) {
    return `This action updates a #${id} trainer`;
  }

  async remove(id: Trainer['id']): Promise<void> {
    let trainer = undefined;
    try {
      trainer = await this.trainerRepository.findOne({ id });
      await this.userService.softDelete(trainer.user.id);
    } catch (error) {
      if (!trainer) throw new NotFoundException();
    }
    return await this.trainerRepository.softDelete(id);
  }
}
