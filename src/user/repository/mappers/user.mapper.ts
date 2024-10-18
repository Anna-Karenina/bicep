import { RoleEntity } from 'src/roles/repository/entitys/role.entity';
import { UserEntity } from '../entities/user.entity';

import { User } from 'src/user/domain/user';
import { StatusEntity } from 'src/statuses/repository/entities/status.entity';
import { FileMapper } from 'src/files/repository/mappers/file.mapper';
import { FileEntity } from 'src/files/repository/entities/file.entity';
import { GymEntity } from 'src/gym/repository/entities/gym.entity';

export class UserMapper {
  static toDomain(raw: UserEntity): User {
    const user = new User();
    user.id = raw.id;
    user.email = raw.email;
    user.password = raw.password;
    user.previousPassword = raw.previousPassword;
    user.provider = raw.provider;
    user.socialId = raw.socialId;
    user.firstName = raw.firstName;
    user.lastName = raw.lastName;
    if (raw.photo) {
      user.photo = FileMapper.toDomain(raw.photo);
    }

    if (raw.gyms?.length) {
      user.gyms = raw.gyms;
    }
    user.role = raw.role;
    user.status = raw.status;
    user.createdAt = raw.createdAt;
    user.updatedAt = raw.updatedAt;
    user.deletedAt = raw.deletedAt;
    return user;
  }

  static toPersistence(user: User): UserEntity {
    let role: RoleEntity | undefined = undefined;
    let photo: FileEntity | undefined | null = undefined;
    let status: StatusEntity | undefined = undefined;
    let gyms: GymEntity[] | undefined = undefined;

    if (user?.gyms?.length) {
      console.log('\n\n populate gyms \n\n');
    }

    if (user.role) {
      role = new RoleEntity();
      role.id = user.role.id;
    }

    if (user.photo) {
      photo = new FileEntity();
      photo.id = user.photo.id;
      photo.path = user.photo.path;
    } else if (user.photo === null) {
      photo = null;
    }

    if (user.status) {
      status = new StatusEntity();
      status.id = user.status.id;
    }

    const userEntity = new UserEntity();
    if (user.id && typeof user.id === 'number') {
      userEntity.id = user.id;
    }
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.previousPassword = user.previousPassword;
    userEntity.provider = user.provider;
    userEntity.socialId = user.socialId;
    userEntity.firstName = user.firstName;
    userEntity.lastName = user.lastName;
    userEntity.photo = photo;
    userEntity.role = role;
    userEntity.status = status;
    userEntity.createdAt = user.createdAt;
    userEntity.updatedAt = user.updatedAt;
    userEntity.deletedAt = user.deletedAt;
    return userEntity;
  }
}
