import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { LoanModule } from './loan/loan.module';

@Module({
  imports: [AuthModule, CardsModule, LoanModule],
})
export class AppModule {}
