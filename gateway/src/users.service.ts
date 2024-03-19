import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly auth_client: ClientProxy,
  ) {}

  create(usersDto: CreateUserDto): Observable<any> {
    return this.auth_client.send('create-user', usersDto);
  }

  getUser(id: number) {
    return this.auth_client.send('get-user', id);
  }

  getUsers() {
    return this.auth_client.send('get-users', {});
  }
}
