import { Session } from 'src/session/domain/session';
import { SessionEntity } from '../entities/session.entity';
import { UserMapper } from 'src/user/repository/mappers/user.mapper';
import { UserEntity } from 'src/user/repository/entities/user.entity';

export class SessionMapper {
  static toDomain(raw: SessionEntity): Session {
    const session = new Session();
    session.id = raw.id;
    if (raw.user) {
      session.user = UserMapper.toDomain(raw.user);
    }
    session.createdAt = raw.createdAt;
    session.deletedAt = raw.deletedAt;
    return session;
  }

  static toPersistence(session: Session): SessionEntity {
    const user = new UserEntity();

    user.id = Number(session.user.id);

    const sessionEntity = new SessionEntity();
    if (session.id && typeof session.id === 'number') {
      sessionEntity.id = session.id;
    }
    sessionEntity.user = user;
    sessionEntity.createdAt = session.createdAt;
    sessionEntity.deletedAt = session.deletedAt;
    return sessionEntity;
  }
}
