import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainerDto } from './create-trainer.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateTrainerDto extends PartialType(CreateTrainerDto) {
  @ApiProperty({ example: 'Fintess' })
  @IsOptional()
  specilizes: string;

  @ApiProperty({ example: '12', description: 'in mouths' })
  @IsOptional()
  experience: number;

  @ApiProperty({ example: 'John' })
  @IsOptional()
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  lastName: string | null;

  @ApiProperty({
    example: 'token',
    description: 'one signal userid from mobile app',
  })
  @IsOptional()
  oneSignalId?: string;
}
