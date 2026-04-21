import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

  @ApiProperty({ description: 'User email' })
  @IsEmail()  
  @IsEmail()  
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;

}