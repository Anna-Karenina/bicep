import { Workout } from 'src/workout/domain/workout';
import { WorkoutEntity } from '../entities/workout.entity';
import { GymMapper } from 'src/gym/repository/mappers/gym.mapper';
import { StudentMapper } from 'src/student/repository/mappers/student.mapper';
import { TrainerMapper } from 'src/trainer/repository/mappers/trainer.mapper';
import { ExerciseStepMapper } from 'src/exercise-step/repository/mappers/exercise-step.mapper';

export class WorkoutMapper {
  static toDomain(raw: WorkoutEntity): Workout {
    const workout = new Workout();
    if (raw.gym) {
      workout.gym = raw.gym;
    }
    if (raw.trainer) {
      workout.trainer = raw.trainer;
    }
    if (raw.students?.length) {
      workout.students = raw.students.map(StudentMapper.toDomain);
    }
    if (raw.exercises?.length) {
      workout.exercises = raw.exercises.map(ExerciseStepMapper.toDomain);
    } else {
      workout.exercises = [];
    }
    workout.id = raw.id;
    workout.stardedAt = raw.stardedAt;
    workout.endedAt = raw.endedAt;
    workout.status = raw.status;
    return workout;
  }

  static toPersistence(workout: Workout): WorkoutEntity {
    const workoutEntity = new WorkoutEntity();
    workoutEntity.stardedAt = workout.stardedAt;
    workoutEntity.endedAt = workout.endedAt;
    workoutEntity.gym = GymMapper.toPersistence(workout.gym);
    workoutEntity.students = workout.students.map(StudentMapper.toPersistence);
    workoutEntity.trainer = TrainerMapper.toPersistence(workout.trainer);
    workoutEntity.status = workout.status;
    workoutEntity.id = workout.id;
    return workoutEntity;
  }
}
