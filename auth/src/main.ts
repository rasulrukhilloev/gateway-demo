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
        package: [AUTH_PACKAGE_NAME, USERS_PACKAGE_NAME],
        protoPath: [
          //__dirname,
          join('src/proto/users.proto'),
          join('src/proto/auth.proto'),
        ],
      },
    },
  );

  // @ts-ignore
  await app.listen(() => console.log('Microservice AUTH listening'));
}

bootstrap();
