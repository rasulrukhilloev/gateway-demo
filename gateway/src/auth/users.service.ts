import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import {
  FindOneUserDto,
  User,
  UserList,
  USERS_SERVICE_NAME,
  UsersServiceClient,
} from './proto/users';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UsersServiceClient;
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  create(usersDto: CreateUserDto): Observable<User> {
    return this.usersService.createUser(usersDto);
  }

  getUser(findUserDto: FindOneUserDto): Observable<User> {
    return this.usersService.findOneUser(findUserDto);
  }

  getUsers(): Observable<UserList> {
    return this.usersService.findAllUsers({});
  }
}
