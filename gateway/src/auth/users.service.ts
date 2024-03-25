import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { USERS_SERVICE_NAME } from '../proto/users';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService;
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.usersService = this.client.getService(USERS_SERVICE_NAME);
  }

  create(usersDto: CreateUserDto): Observable<any> {
    //TODO add type AuthServiceClient from proto
    return this.usersService.createUser(usersDto);
  }

  // getUser(id: number) {
  //   return this.usersService.send('get-user', id);
  // }
  //
  getUsers() {
    return this.usersService.findAllUsers();
  }
}
