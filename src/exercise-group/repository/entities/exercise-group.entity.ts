import { Column, Entity, PrimaryColumn } from 'typeorm';

import { EntityHelper } from 'src/_utils/entity-helper';
import { ExerciseGroup } from 'src/exercise-group/domain/exercise-group';

@Entity({ name: 'exercise_group' })
export class ExerciseGroupEntity extends EntityHelper implements ExerciseGroup {
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;
}
