import { Module } from '@nestjs/common';
import { DepositModule } from './deposit/deposit.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [DepositModule, PrismaModule],
})
export class AppModule {}
