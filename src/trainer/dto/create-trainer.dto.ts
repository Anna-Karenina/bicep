import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateTrainerDto extends CreateUserDto {
  @ApiProperty({ example: 'Fintess' })
  @IsNotEmpty()
  specilizes: string;
  @ApiProperty({ example: '12', description: 'in mouths' })
  @IsNotEmpty()
  experience: number;
}
