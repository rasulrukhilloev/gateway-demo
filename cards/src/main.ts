import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      // logger
      transport: Transport.RMQ,
      options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'cards_queue',
          // queueOptions: {
          //   durable: false,
          // },
      },
      // transport: Transport.KAFKA,
      // options: {
      //   client: {
      //     // clientId: 'cards',
      //     brokers: ['kafka:29092'],
      //   },
      //   consumer: {
      //     groupId: 'cards-consumer',
      //   },
      },
    },
  );

  // app.useGlobalPipes(new ValidationPipe()); //TODO
  //
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  await app.listen();
}

bootstrap();
