import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, Length, MaxLength, MinLength } from 'class-validator';
import { JobRole } from '../../common/enum/jobRole.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username used to identify the user in the system',
    example: 'johndoe',
  })
  @IsString({message: 'Username must be a string'})
  @IsNotEmpty({message: 'Username is required'})
  @Length(3, 50, {message: 'Username must be between 3 and 50 characters'})
  username: string;

  
  @ApiProperty({
    description: 'User email address',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsNotEmpty({message: 'Email is required'})
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'StrongPass123!',
  })
  @IsString({message: 'Password must be a string'})
  @IsNotEmpty({message: 'Password is required'})
  @MinLength(6, {message: 'Password must be at least 6 characters long'})
  @MaxLength(128, {message: 'Password must be at most 128 characters long'})
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: 'Role or occupation of the user',
    example: JobRole.ADMIN,
  })
  @IsEnum(JobRole)
  @IsNotEmpty()
  jobRole: JobRole;
}
