import { User } from 'src/user/domain/user';

export class Session {
  id: number | string;
  user: User;
  createdAt: Date;
  deletedAt: Date;
}
