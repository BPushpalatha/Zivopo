import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Email or phone number for login' })
  @IsString()
  @IsNotEmpty()
  emailOrPhone!: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
