import {
  Body,
  Controller,
  Request,
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

import { CreateWorkoutDto } from './dto/create-workout.dto';
import { WorkoutService } from './workout.service';
import { Workout } from './domain/workout';
import { NullableType } from 'src/_utils/types/nullable.type';
import { Trainer } from 'src/trainer/domain/trainer';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Workout')
@Controller({
  path: 'workout',
  version: '1',
})
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @SerializeOptions({ groups: ['admin'] })
  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Workout,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createGymDto: CreateWorkoutDto): Promise<Workout> {
    return this.workoutService.create(createGymDto);
  }

  @Get('/by-id/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: Workout['id']): Promise<NullableType<Workout>> {
    return this.workoutService.findOne({ id });
  }

  @Get('by-trainer/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'trainerId',
    type: String,
    required: true,
  })
  findWorkoutByTrainer(
    @Param('id') id: Trainer['id'],
  ): Promise<Array<Workout>> {
    return this.workoutService.findWorkoutByTrainer({ id });
  }

  @ApiBearerAuth()
  @SerializeOptions({ groups: ['me'] })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Workout,
  })
  @Get('my')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public my(@Request() request): Promise<Array<Workout>> {
    return this.workoutService.findMyWorkouts(request.user);
  }
}
