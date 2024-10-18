import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  SerializeOptions,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Exercise,
  InfinityPaginationResponseExercise,
} from './domain/exercise';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExerciseService } from './exercise.service';
import { NullableType } from 'src/_utils/types/nullable.type';
import { InfinityPaginationResultType } from 'src/_utils/types/infinity-pagination-result.type';
import { QueryExerciseDto } from './dto/query-exercise.dto';
import { infinityPagination } from 'src/_utils/infinity-pagination';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttachVideoDto } from './dto/attach-video.dto';

@ApiTags('Exercise')
@Controller({
  path: 'exercise',
  version: '1',
})
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @SerializeOptions({ groups: ['admin'] })
  @Post()
  @ApiCreatedResponse({
    description: 'Return new exercise',
    type: Exercise,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() сreateExerciseDto: CreateExerciseDto): Promise<Exercise> {
    return this.exerciseService.create(сreateExerciseDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    description: 'Returns infinity list if exercises',
    type: InfinityPaginationResponseExercise,
  })
  async findAll(
    @Query() query: QueryExerciseDto,
  ): Promise<InfinityPaginationResultType<Exercise>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    return infinityPagination(
      await this.exerciseService.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @SerializeOptions({ groups: ['admin'] })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Exercise,
  })
  findOne(@Param('id') id: Exercise['id']): Promise<NullableType<Exercise>> {
    return this.exerciseService.findOne({ id });
  }

  @Get('/muscle-groups')
  @HttpCode(HttpStatus.OK)
  findExerciseGroups(): Promise<Array<String>> {
    return Promise.resolve(this.exerciseService.findExerciseGroups());
  }

  @Post('/attach-video')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'Returns exercise with video link',
    type: Exercise,
  })

  async attachExerciseVideo(
    @Body() attachVideoDto: AttachVideoDto,
  ): Promise<NullableType<Exercise>> {
    return this.exerciseService.attachExerciseVideo(attachVideoDto);
  }
}
