import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CardsService } from './cards.service';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'CARDS_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://rabbitmq:5672'], //TODO env
    //       // urls: ['amqp://localhost:5672'],
    //       queue: 'cards_queue',
    //       // queueOptions: {
    //       //   durable: false // queue is lost upon restart
    //       // },
    //     },
    //   },
    // ]),
    AuthModule,
  ],
  controllers: [],
  providers: [JwtAuthGuard],
})
export class AppModule {}
