import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from './proto/auth';
import { USERS_PACKAGE_NAME } from './proto/users';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: 'auth:50051', //TODO env
          package: [AUTH_PACKAGE_NAME, USERS_PACKAGE_NAME],
          protoPath: [
            join(__dirname, 'proto/users.proto'),
            join(__dirname, 'proto/auth.proto'),
          ],
        },
      },
    ]),
  ],

  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
