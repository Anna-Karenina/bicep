import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityCondition } from 'src/_utils/types/entity-condition.type';

import { NullableType } from 'src/_utils/types/nullable.type';
import { GymRepository } from './repository/repositories/gym.repository';
import { Gym } from './domain/gym';
import { CreateGymDto } from './dto/create-gym.dto';
import { AttachUserToGymDto } from './dto/attach-user-gym.dto';
import { UsersRepository } from 'src/user/repository/user.repository';

@Injectable()
export class GymService {
  constructor(
    private readonly gymRepository: GymRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  findOne(options: EntityCondition<Gym>): Promise<NullableType<Gym>> {
    return this.gymRepository.findOne(options);
  }

  create(data: CreateGymDto): Promise<Gym> {
    const gym = new Gym();
    gym.address = data.address;
    gym.phone = data.phone;
    gym.schedule = data.schedule;
    return this.gymRepository.create(gym);
  }

  async attachUserToGym(attachUserToGymDto: AttachUserToGymDto) {
    const gym = await this.gymRepository.findOne({
      id: attachUserToGymDto.gymId,
    });

    if (!gym) throw new NotFoundException();
    this.userRepository.attachUserToGym(attachUserToGymDto.userId, gym);
    return;
  }
}
