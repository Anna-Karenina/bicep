import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

import { RoleDto } from 'src/roles/dto/role.dto';
import { StatusDto } from 'src/statuses/dto/status.dto';
import { lowerCaseTransformer } from 'src/_utils/transformers/lower-case.transformer';
import { FileDto } from 'src/files/dto/file.dto';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  provider?: string;
  socialId?: string | null;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;

  hash?: string | null;
}

export class ExtendedCreateUserDto extends CreateUserDto {
  @ApiProperty({ type: RoleDto })
  @Type(() => RoleDto)
  role: RoleDto;

  @ApiProperty({ type: StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status?: StatusDto;
}
