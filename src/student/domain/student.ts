import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { User } from 'src/user/domain/user';

export class Student {
  @ApiProperty({ example: '1' })
  id: number | string;
  @ApiProperty({ type: User })
  user: User;
  @ApiProperty({ example: '11.09.1992' })
  birthday: string;
  @ApiProperty({ example: '60', description: 'in killograms' })
  weight: number;
  @ApiProperty({ example: '172', description: '' })
  growth: number;

  @Expose({ groups: ['admin'] })
  createdAt: Date;
  @Expose({ groups: ['admin'] })
  updatedAt: Date;
  @Expose({ groups: ['admin'] })
  deletedAt: Date;
}

export class InfinityPaginationResponseStudent {
  @ApiProperty({ type: () => Student, isArray: true })
  data: Student[];
  @ApiProperty({ example: false })
  hasNextPage: boolean;
}
