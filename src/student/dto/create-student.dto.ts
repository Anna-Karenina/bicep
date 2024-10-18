import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateStudentDto extends CreateUserDto {
  @ApiProperty({ example: '11.09.1992' })
  @IsNotEmpty()
  birthday: string;

  @ApiProperty({ example: '60', description: 'in killograms' })
  @IsNotEmpty()
  weight: number;

  @ApiProperty({ example: '172', description: '' })
  @IsNotEmpty()
  growth: number;
}
