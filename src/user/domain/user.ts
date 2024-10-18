import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { FileType } from 'src/files/domain/file';
import { Gym } from 'src/gym/domain/gym';
import { Role } from 'src/roles/domain/role';
import { RoleDto } from 'src/roles/dto/role.dto';
import { Status } from 'src/statuses/domain/status';
import { StatusDto } from 'src/statuses/dto/status.dto';

export class User {
  @ApiProperty({ example: '1' })
  id: number | string;

  @ApiProperty({ example: 'bad@apple.com' })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @ApiProperty({ example: 'secret' })
  @Exclude({ toPlainOnly: true })
  password?: string;

  @ApiProperty({ example: 'oldsecret' })
  @Exclude({ toPlainOnly: true })
  previousPassword?: string;

  @ApiProperty({ example: '1', description: 'how user entered' })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @ApiProperty({ example: '1', description: 'for google, apple auth' })
  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;

  @ApiProperty({ example: 'John' })
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  lastName: string | null;

  @ApiProperty({ example: '1' })
  photo?: FileType | null;

  @ApiProperty({ type: RoleDto })
  @Type(() => RoleDto)
  role?: RoleDto;

  @ApiProperty({ type: () => Gym, isArray: true })
  gyms?: Gym[] | [] | null;

  @ApiProperty({ type: StatusDto })
  @Type(() => StatusDto)
  status?: StatusDto;

  @ApiProperty({ example: '79516623438' })
  phone?: string;

  @ApiProperty({
    example: 'token',
    description: 'onesignal userid from mobile app',
  })
  oneSignalId?: string | null;

  @Expose({ groups: ['admin'] })
  createdAt: Date;
  @Expose({ groups: ['admin'] })
  updatedAt: Date;
  @Expose({ groups: ['admin'] })
  deletedAt: Date;
}
