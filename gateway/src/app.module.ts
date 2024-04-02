import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { LoanModule } from './loan/loan.module';
import { DepositModule } from './deposit/deposit.module';

@Module({
  imports: [AuthModule, CardsModule, LoanModule, DepositModule],
})
export class AppModule {}
