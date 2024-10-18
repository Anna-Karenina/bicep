import { Module } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';
import { TrainerEntity } from './repository/entities/trainer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerRepository } from './repository/trainer.repository';
import { UsersModule } from 'src/user/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrainerEntity]), UsersModule],

  controllers: [TrainerController],
  providers: [TrainerService, TrainerRepository],
  exports: [TrainerService, TrainerRepository],
})
export class TrainerModule {}
