import {
  Column,
  AfterLoad,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { EntityHelper } from 'src/_utils/entity-helper';

import { UserEntity } from 'src/user/repository/entities/user.entity';
import { Student } from 'src/student/domain/student';

@Entity({ name: 'student' })
export class StudentEntity extends EntityHelper implements Student {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, { eager: true })
  @JoinColumn()
  user: UserEntity;

  @Index()
  @Column()
  birthday: string;

  @Column()
  weight: number;

  @Column()
  growth: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
