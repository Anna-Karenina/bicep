import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { RoleEnum } from 'src/roles/roles.enum';
import { UserEntity } from 'src/user/repository/entities/user.entity';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.admin,
        },
      },
    });

    if (!countAdmin) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      await this.repository.save(
        this.repository.create({
          firstName: 'Super',
          lastName: 'Admin',
          email: 'admin@example.com',
          password,
          role: {
            id: RoleEnum.admin,
            name: 'Admin',
          },
          status: {
            id: StatusEnum.active,
            name: 'Active',
          },
        }),
      );
    }

    const countStudent = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.student,
        },
      },
    });

    if (!countStudent) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      await this.repository.save(
        this.repository.create({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password,
          role: {
            id: RoleEnum.student,
            name: 'Student',
          },
          status: {
            id: StatusEnum.active,
            name: 'Active',
          },
        }),
      );
    }

    const countTrainer = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.trainer,
        },
      },
    });

    if (!countTrainer) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      await this.repository.save(
        this.repository.create({
          firstName: 'Rocky',
          lastName: 'Balboa',
          email: 'rocky.balboa@example.com',
          password,
          role: {
            id: RoleEnum.trainer,
            name: 'Trainer',
          },
          status: {
            id: StatusEnum.active,
            name: 'Active',
          },
        }),
      );
    }
  }
}
