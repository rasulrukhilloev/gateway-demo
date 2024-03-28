import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { DepositService } from './deposit.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

@Controller()
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @EventPattern('createDeposit')
  create(@Payload() createDepositDto: CreateDepositDto) {
    console.log('create deposit in deposit controller');
    return this.depositService.create(createDepositDto);
  }

  @MessagePattern('findAllDeposit')
  findAll() {
    return this.depositService.findAll();
  }

  @MessagePattern('findOneDeposit')
  findOne(@Payload() id: number) {
    return this.depositService.findOne(id);
  }

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
