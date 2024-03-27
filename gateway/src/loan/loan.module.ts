import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOAN_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'], //TODO env
          queue: 'loan_queue',
          // queueOptions: {
          //   durable: false // queue is lost upon restart
          // },
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [LoanController],
  providers: [LoanService],
})
export class LoanModule {}
