import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CardsService } from './cards.service';
import { UsersService } from './users.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          // urls: ['amqp://localhost:5672'],
          queue: 'auth_queue',
          // queueOptions: {
          //   durable: false // queue is lost upon restart
          // },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'CARDS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          // urls: ['amqp://localhost:5672'],
          queue: 'cards_queue',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AuthService, CardsService, UsersService],
})
export class AppModule {}
