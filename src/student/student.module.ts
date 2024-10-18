import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'src/user/users.module';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentRepository } from './repository/student.repository';
import { StudentEntity } from './repository/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity]), UsersModule],

  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
  exports: [StudentService, StudentRepository],
})
export class StudentModule {}
