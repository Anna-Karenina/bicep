import { UserEntity } from 'src/user/repository/entities/user.entity';
import { StudentEntity } from '../entities/student.entity';
import { UserMapper } from 'src/user/repository/mappers/user.mapper';
import { Student } from 'src/student/domain/student';

export class StudentMapper {
  static toDomain(raw: StudentEntity): Student {
    const student = new Student();

    student.birthday = raw.birthday;
    student.growth = raw.growth;
    student.id = raw.id;
    student.weight = raw.weight;
    if (raw.user) {
      student.user = UserMapper.toDomain(raw.user);
    }

    return student;
  }

  static toPersistence(student: Student): StudentEntity {
    const studentEntity = new StudentEntity();
    studentEntity.birthday = student.birthday;
    studentEntity.growth = student.growth;
    studentEntity.weight = student.weight;

    if (student.id && typeof student.id === 'number') {
      studentEntity.id = student.id;
    }

    let user: UserEntity | undefined = undefined;
    if (student.user) {
      user = UserMapper.toPersistence(student.user);
    }
    studentEntity.user = user;

    return studentEntity;
  }
}
