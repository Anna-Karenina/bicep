import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthGoogleLoginDto {
  @ApiProperty({
    example: 'abc',
    description: 'for example from @react-oauth/google',
  })
  @IsNotEmpty()
  idToken: string;
}
