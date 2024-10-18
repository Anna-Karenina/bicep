import { Column, Entity, PrimaryColumn } from 'typeorm';

import { EntityHelper } from 'src/_utils/entity-helper';
import { Status } from 'src/statuses/domain/status';

@Entity({
  name: 'status',
})
export class StatusEntity extends EntityHelper implements Status {
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;
}
