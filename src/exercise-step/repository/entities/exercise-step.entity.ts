import { EntityHelper } from 'src/_utils/entity-helper';
import { ExerciseStep } from 'src/exercise-step/domain/exercise-step';
import { WorkoutEntity } from 'src/workout/repository/entities/workout.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity({
  name: 'exercise_step',
})
export class ExerciseStepEntity extends EntityHelper implements ExerciseStep {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weight: number;

  @Column()
  repeat_quantity: number;

  @Column()
  amount: number;

  @Column()
  exerciseId: number;

  @ManyToOne(() => WorkoutEntity)
  workout: WorkoutEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
