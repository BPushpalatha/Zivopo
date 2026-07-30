import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Full name of the user' })
  @IsString()
  @IsNotEmpty()
  displayName!: string;

  @ApiProperty({ description: 'Email address' })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'Phone number' })
  @IsPhoneNumber('IN')
  phone!: string;

  @ApiProperty({ description: 'Account password' })
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({ description: 'Role of the user', required: false, type: String, example: 'CUSTOMER' })
  @IsOptional()
  role?: string;
}
