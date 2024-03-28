import { Module } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import { AuthModule } from '../auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DEPOSIT_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats'], //TODO env
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule {}
