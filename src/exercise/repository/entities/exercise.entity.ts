import { EntityHelper } from 'src/_utils/entity-helper';
import { ExerciseGroupEntity } from 'src/exercise-group/repository/entities/exercise-group.entity';
import { Exercise } from 'src/exercise/domain/exercise';
import { FileEntity } from 'src/files/repository/entities/file.entity';
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
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'exercise' })
export class ExerciseEntity extends EntityHelper implements Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => ExerciseGroupEntity, { eager: true })
  @JoinTable()
  groups: ExerciseGroupEntity[];

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => FileEntity, { eager: true })
  video?: FileEntity | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
