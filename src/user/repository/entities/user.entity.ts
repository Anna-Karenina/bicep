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
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { EntityHelper } from 'src/_utils/entity-helper';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
// We use class-transformer in ORM entity and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an ORM entity directly in response.
import { Exclude, Expose } from 'class-transformer';
import { User } from 'src/user/domain/user';
import { RoleEntity } from 'src/roles/repository/entitys/role.entity';
import { StatusEntity } from 'src/statuses/repository/entities/status.entity';
import { FileEntity } from 'src/files/repository/entities/file.entity';
import { GymEntity } from 'src/gym/repository/entities/gym.entity';
import { IsOptional } from 'class-validator';

@Entity({ name: 'user' })
export class UserEntity extends EntityHelper implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password?: string;

  @Column({ type: String, nullable: true })
  phone?: string | null;

  @Exclude({ toPlainOnly: true })
  public previousPassword?: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @Column({ default: AuthProvidersEnum.email })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Index()
  @Column({ type: String, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @ManyToMany(() => GymEntity, { eager: true })
  @JoinTable()
  gyms?: GymEntity[] | [] | null;

  @ManyToOne(() => FileEntity, { eager: true })
  photo?: FileEntity | null;

  @ManyToOne(() => RoleEntity, { eager: true })
  role?: RoleEntity | null;

  @ManyToOne(() => StatusEntity, { eager: true })
  status?: StatusEntity;

  @Index()
  @Column({ type: String, nullable: true })
  @Expose({ groups: ['admin'] })
  @IsOptional()
  oneSignalId?: string | null;

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn()
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn()
  deletedAt: Date;
}
