import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateUserDto as CreateUserDtoProto } from '../../proto/users';

export class CreateUserDto implements CreateUserDtoProto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
