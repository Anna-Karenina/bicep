import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { GymService } from './gym.service';
import { Gym } from './domain/gym';
import { CreateGymDto } from './dto/create-gym.dto';
import { NullableType } from 'src/_utils/types/nullable.type';
import { AttachUserToGymDto } from './dto/attach-user-gym.dto';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Gym')
@Controller({
  path: 'gym',
  version: '1',
})
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @SerializeOptions({ groups: ['admin'] })
  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Gym,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createGymDto: CreateGymDto): Promise<Gym> {
    return this.gymService.create(createGymDto);
  }

  @Post('/attach-user-to-gym')
  @HttpCode(HttpStatus.NO_CONTENT)
  attachUserToGym(
    @Body() attachUserToGymDto: AttachUserToGymDto,
  ): Promise<void> {
    return this.gymService.attachUserToGym(attachUserToGymDto);
  }
  // @SerializeOptions({groups: ['admin'],})
  // @Get()
  // @HttpCode(HttpStatus.OK)
  // async findAll(
  //   @Query() query: QueryUserDto,
  // ): Promise<InfinityPaginationResultType<User>> {
  //   const page = query?.page ?? 1;
  //   let limit = query?.limit ?? 10;
  //   if (limit > 50) {
  //     limit = 50;
  //   }

  //   return infinityPagination(
  //     await this.usersService.findManyWithPagination({
  //       filterOptions: query?.filters,
  //       sortOptions: query?.sort,
  //       paginationOptions: {
  //         page,
  //         limit,
  //       },
  //     }),
  //     { page, limit },
  //   );
  // }

  @SerializeOptions({ groups: ['admin'] })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: Gym['id']): Promise<NullableType<Gym>> {
    return this.gymService.findOne({ id });
  }
}
