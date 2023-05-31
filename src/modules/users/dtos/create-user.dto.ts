import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type : String,
    description : 'name of the user',
    example : 'jenil'
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type : String,
    description : 'email of the user',
    example : 'jenil123@gmail.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type : String,
    description : 'phone number of the user',
    example : '8901897843'
  })
  @IsPhoneNumber('IN')
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type : String,
    description : 'password of the user',
    example : 'jenil123'
  })
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;
}
