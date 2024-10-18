import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/domain/user';

export type LoginResponseType = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}>;

export class LoginResponse {
  @ApiProperty({ type: User })
  user: User;
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'access token',
  })
  token: string;
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'ref token',
  })
  refreshToken: string;
  @ApiProperty({
    example: '1729338362500',
    description: 'token expire timestamp',
  })
  tokenExpires: number;
}
