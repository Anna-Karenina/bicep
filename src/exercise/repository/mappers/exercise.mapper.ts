import { Exercise } from 'src/exercise/domain/exercise';
import { ExerciseEntity } from '../entities/exercise.entity';
import { ExerciseGroupEntity } from 'src/exercise-group/repository/entities/exercise-group.entity';

export class ExerciseMapper {
  static toDomain(raw: ExerciseEntity): Exercise {
    const exercise = new Exercise();
    exercise.groups = raw.groups;
    exercise.description = raw.description;
    exercise.name = raw.name;
    exercise.video = raw.video;
    exercise.id = raw.id;

    return exercise;
  }

  static toPersistence(exercise: Exercise): ExerciseEntity {
    const exerciseEntity = new ExerciseEntity();

    let groups: ExerciseGroupEntity[] | undefined = undefined;
    exerciseEntity.name = exercise.name;
    exerciseEntity.description = exercise.description;

    if (exercise.groups.length) {
      groups = exercise.groups.map((v) => {
        const g = new ExerciseGroupEntity();
        g.id = v.id;
        g.name = v.name;
        return g;
      });
    }
    exerciseEntity.groups = groups;
    return exerciseEntity;
  }
}
