import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/_utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/_utils/types/pagination-options';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { NullableType } from 'src/_utils/types/nullable.type';

import { FilterUserDto, SortUserDto } from 'src/user/dto/query-user.dto';
import { User } from 'src/user/domain/user';
import { StudentEntity } from './entities/student.entity';
import { Student } from '../domain/student';
import { StudentMapper } from './mappers/student.mapper';
import { FilterStudentDto, SortStudentDto } from '../dto/query-student.dto';

@Injectable()
export class StudentRepository {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async create(data: Student): Promise<Student> {
    const persistenceModel = StudentMapper.toPersistence(data);
    const newEntity = await this.studentRepository.save(
      this.studentRepository.create(persistenceModel),
    );
    return StudentMapper.toDomain(newEntity);
  }

  async findMany(studenstIds: Array<Student['id']>): Promise<Student[]> {
    const entitys = await this.studentRepository.find({
      where: { id: In([...studenstIds]) },
    });
    return entitys.map(StudentMapper.toDomain);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterStudentDto | null;
    sortOptions?: SortStudentDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Student[]> {
    const where: FindOptionsWhere<StudentEntity> = {};

    const entities = await this.studentRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((user) => StudentMapper.toDomain(user));
  }

  async findOne(
    fields: EntityCondition<Student>,
  ): Promise<NullableType<Student>> {
    const entity = await this.studentRepository.findOne({
      where: fields as FindOptionsWhere<StudentEntity>,
      relations: {
        user: true,
      },
    });

    return entity ? StudentMapper.toDomain(entity) : null;
  }

  async update(id: User['id'], payload: Partial<Student>): Promise<Student> {
    const entity = await this.studentRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Trainer not found');
    }

    const updatedEntity = await this.studentRepository.save(
      this.studentRepository.create(
        StudentMapper.toPersistence({
          ...StudentMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return StudentMapper.toDomain(updatedEntity);
  }

  async softDelete(id: User['id']): Promise<void> {
    await this.studentRepository.softDelete(id);
  }
}
