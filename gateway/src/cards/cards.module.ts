import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CARDS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'cards',
            brokers: ['kafka:29092'],
          },
          consumer: {
            groupId: 'cards-consumer',
          },
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
