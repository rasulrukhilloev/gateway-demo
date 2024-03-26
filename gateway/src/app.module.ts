import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [AuthModule, CardsModule],
})
export class AppModule {}
