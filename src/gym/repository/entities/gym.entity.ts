import { IsNumber, Min } from 'class-validator';
import { EntityHelper } from 'src/_utils/entity-helper';
import { Gym } from 'src/gym/domain/gym';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'gym' })
export class GymEntity extends EntityHelper implements Gym {
  @PrimaryGeneratedColumn()
  id: number | string;

  @Column('text', { array: true })
  schedule: string[];

  @Column()
  address: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
