import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username used to identify the user in the system',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  username: string;

  
  @ApiProperty({
    description: 'User email address',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'StrongPass123!',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(128)
  password: string;

  @ApiProperty({
    description: 'Role or occupation of the user',
    example: 'driver',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  jobRole: string;
}
