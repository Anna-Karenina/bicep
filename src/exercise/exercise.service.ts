import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Exercise } from './domain/exercise';
import { ExerciseRepository } from './repository/repositories/exercise.repository';
import { EntityCondition } from 'src/_utils/types/entity-condition.type';
import { NullableType } from 'src/_utils/types/nullable.type';
import {
  ExerciseGroupEnum,
} from 'src/exercise-group/exercise-group.enum';
import { FilterExerciseDto, SortExerciseDto } from './dto/query-exercise.dto';
import { IPaginationOptions } from 'src/_utils/types/pagination-options';
import { AttachVideoDto } from './dto/attach-video.dto';
import { FileRepository } from 'src/files/repository/file.repository';
import { ExerciseGroup } from 'src/exercise-group/domain/exercise-group';

@Injectable()
export class ExerciseService {
  constructor(
    private readonly exerciseRepository: ExerciseRepository,
    private readonly fileRepository: FileRepository,
  ) {}

  findOne(options: EntityCondition<Exercise>): Promise<NullableType<Exercise>> {
    return this.exerciseRepository.findOne(options);
  }

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const exercise = new Exercise();
    exercise.groups = createExerciseDto.exerciseGroups;
    exercise.description = createExerciseDto.description;
    exercise.name = createExerciseDto.name;

    return await this.exerciseRepository.create(exercise);
  }

  findExerciseGroups(): ExerciseGroup[] {
    return Object.values(ExerciseGroupEnum).map((v: string, idx) => {
      const exerciseGroup = new ExerciseGroup();
      exerciseGroup.id = idx + 1;
      exerciseGroup.name = v;
      return exerciseGroup;
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterExerciseDto | null;
    sortOptions?: SortExerciseDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Exercise[]> {
    return this.exerciseRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }
  async attachExerciseVideo(attachVideoDto: AttachVideoDto): Promise<Exercise> {
    const exercise = await this.exerciseRepository.findOne({
      id: attachVideoDto.exerciseId,
    });
    const file = await this.fileRepository.findOne({
      id: attachVideoDto.videoFileId,
    });
    exercise.video = file;

    return this.exerciseRepository.update(exercise);
  }
}
