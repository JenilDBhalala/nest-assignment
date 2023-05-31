import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInUserDto {
  @ApiProperty({
    type: String,
    description: 'email of the user',
    example: 'jenil123@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'password of the user',
    example: 'jenil123',
  })
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;
}
