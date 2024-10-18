import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SerializeOptions,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RoleEnum } from 'src/roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { NullableType } from 'src/_utils/types/nullable.type';
import { InfinityPaginationResponseTrainer, Trainer } from './domain/trainer';
import { QueryTrainerDto } from './dto/query-trainer.dto';
import { InfinityPaginationResultType } from 'src/_utils/types/infinity-pagination-result.type';
import { infinityPagination } from 'src/_utils/infinity-pagination';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Trainer')
@Controller({
  path: 'trainer',
  version: '1',
})
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SerializeOptions({ groups: ['admin'] })
  @ApiCreatedResponse({
    description: 'Return new trainer',
    type: Trainer,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrainerDto: CreateTrainerDto) {
    return this.trainerService.create(createTrainerDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    description: 'Returns infinity list trainers exercises',
    type: InfinityPaginationResponseTrainer,
  })
  async findAll(
    @Query() query: QueryTrainerDto,
  ): Promise<InfinityPaginationResultType<Trainer>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    return infinityPagination(
      await this.trainerService.findManyWithPagination({
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
  @ApiOkResponse({
    description: 'returns trainer by id',
    type: Trainer,
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: Trainer['id']): Promise<NullableType<Trainer>> {
    return this.trainerService.findOne({ id });
  }

  @SerializeOptions({ groups: ['admin', 'me'] })
  @ApiCreatedResponse({
    description: 'Return the trainer instanse',
    type: Trainer,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
    return this.trainerService.update(+id, updateTrainerDto);
  }

  @SerializeOptions({ groups: ['admin'] })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainerService.remove(+id);
  }
}
