import { EntityHelper } from 'src/_utils/entity-helper';
import { Session } from 'src/session/domain/session';
import { UserEntity } from 'src/user/repository/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({
  name: 'session',
})
export class SessionEntity extends EntityHelper implements Session {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @Index()
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
