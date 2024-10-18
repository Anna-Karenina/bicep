import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGymDto {
  @ApiProperty({ example: '79516623438' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: ['10', '21'] })
  @IsNotEmpty()
  schedule: string[];

  @ApiProperty({ example: 'Moscow, Tverskaya 1' })
  @IsNotEmpty()
  address: string | null;
}
