import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityHelper } from 'src/_utils/entity-helper';
import { Role } from 'src/roles/domain/role';

@Entity({
  name: 'role',
})
export class RoleEntity extends EntityHelper implements Role {
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;
}
