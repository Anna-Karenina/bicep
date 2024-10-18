import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';

import { EntityHelper } from 'src/_utils/entity-helper';
import { Trainer } from 'src/trainer/domain/trainer';
import { UserEntity } from 'src/user/repository/entities/user.entity';

@Entity({ name: 'trainer' })
export class TrainerEntity extends EntityHelper implements Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, { eager: true, cascade: true })
  @JoinColumn()
  user: UserEntity;

  @Index()
  @Column()
  specilizes: string;
  @Column()
  experience: number; //mouths

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
