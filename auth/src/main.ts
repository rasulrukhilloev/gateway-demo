import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from './proto/auth';
import { USERS_PACKAGE_NAME } from './proto/users';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
  );

  // @ts-ignore
  await app.listen(() => console.log('Microservice AUTH listening'));
}

bootstrap();
