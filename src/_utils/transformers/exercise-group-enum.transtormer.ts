import { TransformFnParams } from 'class-transformer/types/interfaces';
import { MaybeType } from '../types/maybe.type';
import {
  ExerciseGroupEnum,
  ReadableExerciseGroupEnum,
} from 'src/exercise-group/exercise-group.enum';
import { ExerciseGroup } from 'src/exercise-group/domain/exercise-group';

export const exerciseGroupsEnumTransformer = (
  params: TransformFnParams,
): MaybeType<ExerciseGroup[]> =>
  params.value
    ?.map((g: string) => ({
      id: ExerciseGroupEnum[g],
      name: ReadableExerciseGroupEnum[g],
    }))
    .filter((v: ExerciseGroup) => v.id);
