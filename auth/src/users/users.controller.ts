import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  UsersServiceController,
  UsersServiceControllerMethods,
} from '../proto/users';

@Controller('users')
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // async getUser(id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @ts-ignore
  async findAllUsers() {
    return this.usersService.findAll();
  }
}
