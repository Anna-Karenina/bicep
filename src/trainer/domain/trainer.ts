import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/domain/user';

export class Trainer {
  @ApiProperty({ example: '1' })
  id: number | string;
  @ApiProperty({ type: User })
  user: User;
  @ApiProperty({ example: 'Fitnes' })
  specilizes: string;
  @ApiProperty({ example: 12, description: 'In mouth' })
  experience: number;
}

export class InfinityPaginationResponseTrainer {
  @ApiProperty({ type: () => Trainer, isArray: true })
  data: Trainer[];
  @ApiProperty({ example: false })
  hasNextPage: boolean;
}
