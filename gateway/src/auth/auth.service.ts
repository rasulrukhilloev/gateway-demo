import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import {
  AUTH_SERVICE_NAME,
  AuthEntity,
  AuthServiceClient,
  TokenValidResult,
} from '../proto/auth';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }
  authenticate(token: AuthEntity): Observable<TokenValidResult> {
    return this.authService.authenticate(token);
  }

  login(loginData: LoginDto): Observable<AuthEntity> {
    return this.authService
      .login(loginData)
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }
}
