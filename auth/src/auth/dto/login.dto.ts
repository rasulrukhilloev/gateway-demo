import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { LoginDto as LoginDtoProto } from '../../proto/auth';

export class LoginDto implements LoginDtoProto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
