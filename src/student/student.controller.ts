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

import { CreateStudentDto } from './dto/create-student.dto';
import { StudentService } from './student.service';
import { InfinityPaginationResponseStudent, Student } from './domain/student';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InfinityPaginationResultType } from 'src/_utils/types/infinity-pagination-result.type';
import { QueryStudentDto } from './dto/query-student.dto';
import { infinityPagination } from 'src/_utils/infinity-pagination';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Student')
@Controller({
  path: 'student',
  version: '1',
})
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @SerializeOptions({ groups: ['admin'] })
  @ApiCreatedResponse({
    description: 'Return new student',
    type: Student,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: InfinityPaginationResponseStudent,
  })
  async findAll(
    @Query() query: QueryStudentDto,
  ): Promise<InfinityPaginationResultType<Student>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    return infinityPagination(
      await this.studentService.findManyWithPagination({
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
  @Get(':id')
  @SerializeOptions({ groups: ['admin'] })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'returns student by id.',
    type: Student,
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: Student['id']): Promise<NullableType<Student>> {
    return this.studentService.findOne({ id });
  }

  @SerializeOptions({ groups: ['admin'] })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @SerializeOptions({ groups: ['admin'] })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
