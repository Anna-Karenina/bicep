import { EntityHelper } from 'src/_utils/entity-helper';
import { ExerciseStepEntity } from 'src/exercise-step/repository/entities/exercise-step.entity';
import { GymEntity } from 'src/gym/repository/entities/gym.entity';
import { StudentEntity } from 'src/student/repository/entities/student.entity';
import { TrainerEntity } from 'src/trainer/repository/entities/trainer.entity';
import { Workout } from 'src/workout/domain/workout';
import { WorkoutStatus } from 'src/workout/emuns/status.enum';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  Column,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
  Index,
} from 'typeorm';

@Entity({
  name: 'workout',
})
export class WorkoutEntity extends EntityHelper implements Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  @Index()
  stardedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @Index()
  endedAt: Date;

  @Column({ type: 'enum', enum: WorkoutStatus, default: WorkoutStatus.CREATED })
  status: WorkoutStatus;

  @ManyToOne(() => GymEntity, { eager: true })
  gym?: GymEntity;

  @ManyToMany(() => StudentEntity, { eager: true })
  @JoinTable()
  students?: StudentEntity[] | [] | null;

  @ManyToOne(() => TrainerEntity, { eager: true })
  @JoinColumn()
  trainer?: TrainerEntity;

  @OneToMany(() => ExerciseStepEntity, (ex) => ex.workout)
  @JoinTable()
  exercises?: ExerciseStepEntity[] | [] | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
