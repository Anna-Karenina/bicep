import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ExerciseGroup } from 'src/exercise-group/domain/exercise-group';
import { ReadableExerciseGroupEnum } from 'src/exercise-group/exercise-group.enum';
import { FileType } from 'src/files/domain/file';

export class Exercise {
  @ApiProperty({ example: '1' })
  id: number;

  @ApiProperty({ enum: ReadableExerciseGroupEnum, isArray: true })
  groups: ExerciseGroup[];

  @ApiProperty({ example: '1' })
  name: string;
  @ApiProperty({ example: '1' })
  description: string;

  @ApiProperty({ example: '1' })
  video?: FileType | null;

  @Expose({ groups: ['admin'] })
  createdAt: Date;
  @Expose({ groups: ['admin'] })
  updatedAt: Date;
  @Expose({ groups: ['admin'] })
  deletedAt: Date;
}

export class InfinityPaginationResponseExercise {
  @ApiProperty({ type: () => Exercise, isArray: true })
  data: Exercise[];
  @ApiProperty({ example: false })
  hasNextPage: boolean;
}
