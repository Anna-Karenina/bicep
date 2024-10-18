import { Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/user';
import { EntityCondition } from 'src/_utils/types/entity-condition.type';
import { SessionRepository } from './repository/session.repository';
import { Session } from './domain/session';
import { NullableType } from 'src/_utils/types/nullable.type';

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  findOne(options: EntityCondition<Session>): Promise<NullableType<Session>> {
    return this.sessionRepository.findOne(options);
  }

  create(
    data: Omit<Session, 'id' | 'createdAt' | 'deletedAt'>,
  ): Promise<Session> {
    return this.sessionRepository.create(data);
  }

  async softDelete(criteria: {
    id?: Session['id'];
    user?: Pick<User, 'id'>;
    excludeId?: Session['id'];
  }): Promise<void> {
    await this.sessionRepository.softDelete(criteria);
  }
}
