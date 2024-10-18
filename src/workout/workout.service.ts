import { Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/_utils/types/entity-condition.type';
import { NullableType } from 'src/_utils/types/nullable.type';
import { WorkoutRepository } from './repository/repositories/workout.repository';
import { Workout } from './domain/workout';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { GymRepository } from 'src/gym/repository/repositories/gym.repository';
import { TrainerRepository } from 'src/trainer/repository/trainer.repository';
import { StudentRepository } from 'src/student/repository/student.repository';
import { WorkoutStatus } from './emuns/status.enum';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { WorkoutMapper } from './repository/mappers/workout.mapper';

@Injectable()
export class WorkoutService {
  constructor(
    private readonly workoutRepository: WorkoutRepository,
    private readonly gymRepository: GymRepository,
    private readonly studentsRepository: StudentRepository,
    private readonly trainerRepositore: TrainerRepository,
  ) {}

  async create(data: CreateWorkoutDto): Promise<Workout> {
    const workout = new Workout();
    workout.status = WorkoutStatus.CREATED;
    const gym = await this.gymRepository.findOne({ id: data.gymId });
    const students = await this.studentsRepository.findMany(data.studentsIds);
    const trainer = await this.trainerRepositore.findOne({
      id: data.trainerId,
    });

    workout.gym = gym;
    workout.students = students;
    workout.trainer = trainer;
    workout.stardedAt = data.startedAt;
    workout.endedAt = data.endedAt;

    return this.workoutRepository.create(workout);
  }

  findOne(options: EntityCondition<Workout>): Promise<NullableType<Workout>> {
    return this.workoutRepository.findOne(options);
  }

  async findWorkoutByTrainer(id: { id: string | number }): Promise<Workout[]> {
    const workoutsEntity = await this.workoutRepository.findByTrainer(id.id);
    const workouts = workoutsEntity.map(WorkoutMapper.toDomain);
    return workouts;
  }

  async findMyWorkouts(userJwtPayload: JwtPayloadType): Promise<Workout[]> {
    let workouts = [];
    const trainer = await this.trainerRepositore.findTrainerByUserId(
      userJwtPayload.id,
    );

    const workoutsEntity = await this.workoutRepository.findByTrainer(
      trainer.id,
    );
    if (workoutsEntity.length) {
      workouts = workoutsEntity.map(WorkoutMapper.toDomain);
    }

    return workouts;
  }
}
