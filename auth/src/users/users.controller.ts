import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  FindOneUserDto,
  User,
  UserList,
  UsersServiceController,
  UsersServiceControllerMethods,
} from '../proto/users';

@Controller('users')
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  async findOneUser(findUserDto: FindOneUserDto): Promise<User> {
    return this.usersService.findOne(findUserDto.userId);
  }
  async findAllUsers(): Promise<UserList> {
    return this.usersService.findAll();
  }
}
