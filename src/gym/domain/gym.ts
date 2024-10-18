import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class Gym {
  @ApiProperty({ example: 1 })
  id: number | string;

  @ApiProperty({ example: ['10', '20'] })
  schedule: string[];

  @ApiProperty({ example: 'Moscow, Tverskaya 1' })
  address: string;

  @ApiProperty({ example: '79516623438' })
  phone: string;

  @Expose({ groups: ['admin'] })
  createdAt: Date;
  @Expose({ groups: ['admin'] })
  updatedAt: Date;
  @Expose({ groups: ['admin'] })
  deletedAt: Date;
}
