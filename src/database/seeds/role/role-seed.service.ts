import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/roles/repository/entitys/role.entity';

import { RoleEnum } from 'src/roles/roles.enum';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<RoleEntity>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        id: RoleEnum.admin,
      },
    });

    if (!countAdmin) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.admin,
          name: 'Admin',
        }),
      );
    }

    const countStudent = await this.repository.count({
      where: {
        id: RoleEnum.student,
      },
    });

    if (!countStudent) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.student,
          name: 'Student',
        }),
      );
    }
    const countTrainer = await this.repository.count({
      where: {
        id: RoleEnum.trainer,
      },
    });

    if (!countTrainer) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.trainer,
          name: 'Trainer',
        }),
      );
    }
  }
}
