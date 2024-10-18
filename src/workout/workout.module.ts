import { Module } from '@nestjs/common';

import { WorkoutEntity } from './repository/entities/workout.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutRepository } from './repository/repositories/workout.repository';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { GymModule } from 'src/gym/gym.module';
import { StudentModule } from 'src/student/student.module';
import { TrainerModule } from 'src/trainer/trainer.module';
import { UsersRepository } from 'src/user/repository/user.repository';
import { UserEntity } from 'src/user/repository/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkoutEntity]),
    GymModule,
    StudentModule,
    TrainerModule,
  ],
  controllers: [WorkoutController],
  providers: [WorkoutService, WorkoutRepository],
  exports: [WorkoutService, WorkoutRepository],
})
export class WorkoutModule {}
