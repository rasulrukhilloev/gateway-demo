import { Inject, Injectable, Req } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthService } from './auth.service';
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
