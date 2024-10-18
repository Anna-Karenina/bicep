import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AttachUserToGymDto {
  @ApiProperty({ example: '12', description: 'userId' })
  @IsNotEmpty()
  userId: number | null;

  @ApiProperty({ example: '1', description: 'gymId' })
  @IsNotEmpty()
  gymId: number | null;
}
