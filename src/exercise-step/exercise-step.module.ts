import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseStepController } from './exercise-step.controller';
import { ExerciseStepService } from './exercise-step.service';
import { ExerciseStepRepository } from './repository/repositories/exercise-step.repository';
import { ExerciseStepEntity } from './repository/entities/exercise-step.entity';
import { WorkoutModule } from 'src/workout/workout.module';
import { WorkoutRepository } from 'src/workout/repository/repositories/workout.repository';
import { WorkoutEntity } from 'src/workout/repository/entities/workout.entity';
import { WorkoutService } from 'src/workout/workout.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseStepEntity, WorkoutEntity])],
  controllers: [ExerciseStepController],
  providers: [ExerciseStepService, ExerciseStepRepository, WorkoutRepository],
  exports: [ExerciseStepService, ExerciseStepRepository],
})
export class ExerciseStepModule {}
