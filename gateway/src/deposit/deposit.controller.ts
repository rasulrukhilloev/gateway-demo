import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { CreateLoanDto } from '../loan/dto/create-loan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDepositDto: CreateDepositDto, @Req() req: any) {
    return this.depositService.create(createDepositDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.depositService.findAll();
  }

  // @MessagePattern('findOneDeposit')
  // findOne(@Payload() id: number) {
  //   return this.depositService.findOne(id);
  // }

  // @MessagePattern('updateDeposit')
  // update(@Payload() updateDepositDto: UpdateDepositDto) {
  //   return this.depositService.update(updateDepositDto.id, updateDepositDto);
  // }
  //
  // @MessagePattern('removeDeposit')
  // remove(@Payload() id: number) {
  //   return this.depositService.remove(id);
  // }
}
