import { Injectable } from '@nestjs/common';
import { UpdateStudentDto } from './dto/update-student.dto';

import { NullableType } from 'src/_utils/types/nullable.type';
import { EntityCondition } from 'src/_utils/types/entity-condition.type';
import { StudentRepository } from './repository/student.repository';
import { UsersService } from 'src/user/users.service';
import { Student } from './domain/student';
import { CreateStudentDto } from './dto/create-student.dto';
import { RoleDto } from 'src/roles/dto/role.dto';
import { FilterStudentDto, SortStudentDto } from './dto/query-student.dto';
import { IPaginationOptions } from 'src/_utils/types/pagination-options';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly userService: UsersService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const role = new RoleDto();
    role.id = 3;
    const user = await this.userService.create({ ...createStudentDto, role });
    const newUser = await this.userService.findOne({ id: user.id });

    const student = new Student();
    student.birthday = createStudentDto.birthday;
    student.growth = createStudentDto.growth;
    student.user = newUser;
    student.weight = createStudentDto.weight;
    return await this.studentRepository.create(student);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterStudentDto | null;
    sortOptions?: SortStudentDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Student[]> {
    return this.studentRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findOne(fields: EntityCondition<Student>): Promise<NullableType<Student>> {
    return this.studentRepository.findOne(fields);
  }

  update(id: number, updateTrainerDto: UpdateStudentDto) {
    return `This action updates a #${id} trainer`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainer`;
  }
}
