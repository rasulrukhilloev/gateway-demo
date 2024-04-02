import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LoanModule } from './loan/loan.module';

@Module({
  imports: [PrismaModule, LoanModule],
})
export class AppModule {}
