import { UserEntity } from 'src/user/repository/entities/user.entity';
import { TrainerEntity } from '../entities/trainer.entity';
import { Trainer } from 'src/trainer/domain/trainer';
import { UserMapper } from 'src/user/repository/mappers/user.mapper';

export class TrainerMapper {
  static toDomain(raw: TrainerEntity): Trainer {
    let trainer = new Trainer();
    trainer.experience = raw.experience;
    trainer.id = raw.id;
    trainer.specilizes = raw.specilizes;

    if (raw.user) {
      trainer.user = UserMapper.toDomain(raw.user);
    }

    return trainer;
  }

  static toPersistence(trainer: Trainer): TrainerEntity {
    const trainerEntity = new TrainerEntity();
    trainerEntity.experience = trainer.experience;
    trainerEntity.specilizes = trainer.specilizes;

    if (trainer.id && typeof trainer.id === 'number') {
      trainerEntity.id = trainer.id;
    }

    let user: UserEntity | undefined = undefined;
    if (trainer.user) {
      user = UserMapper.toPersistence(trainer.user);
    }
    trainerEntity.user = user;

    return trainerEntity;
  }
}
