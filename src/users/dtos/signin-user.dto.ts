import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../constants/roles.enum';

export class SignInUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
