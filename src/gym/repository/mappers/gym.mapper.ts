import { Gym } from 'src/gym/domain/gym';
import { GymEntity } from '../entities/gym.entity';

export class GymMapper {
  static toDomain(raw: GymEntity): Gym {
    const gym = new Gym();

    console.log(raw);

    gym.address = raw.address;
    gym.createdAt = raw.createdAt;
    gym.deletedAt = raw.deletedAt;
    gym.updatedAt = raw.updatedAt;
    gym.id = raw.id;
    gym.phone = raw.phone;
    gym.schedule = raw.schedule;

    return gym;
  }

  static toPersistence(gym: Gym): GymEntity {
    const gymEntity = new GymEntity();
    gymEntity.address = gym.address;
    if (gym.id && typeof gym.id === 'number') {
      gymEntity.id = gym.id;
    }
    gymEntity.createdAt = gym.createdAt;
    gymEntity.deletedAt = gym.deletedAt;
    gymEntity.updatedAt = gym.updatedAt;
    gymEntity.phone = gym.phone;
    gymEntity.schedule = gym.schedule;

    return gymEntity;
  }
}
