import { Allow } from 'class-validator';

export class ExerciseGroup {
  @Allow()
  id: number;

  @Allow()
  name?: string;
}
