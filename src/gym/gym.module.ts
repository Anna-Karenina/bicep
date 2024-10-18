import { Module } from '@nestjs/common';

import { GymEntity } from './repository/entities/gym.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GymRepository } from './repository/repositories/gym.repository';
import { GymService } from './gym.service';
import { GymController } from './gym.controller';
import { UserEntity } from 'src/user/repository/entities/user.entity';
import { UsersRepository } from 'src/user/repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GymEntity, UserEntity])],
  controllers: [GymController],
  providers: [GymService, GymRepository, UsersRepository],
  exports: [GymService, GymRepository],
})
export class GymModule {}
