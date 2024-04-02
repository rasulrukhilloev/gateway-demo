import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
// import { UpdateLoanDto } from './dto/update-loan.dto';

@Controller()
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @EventPattern('createLoan')
  async create(loanDto: CreateLoanDto) {
    return this.loanService.create(loanDto);
  }

  @MessagePattern('findAllLoan')
  findAll() {
    return this.loanService.findAll();
  }

  @MessagePattern('findOneLoan')
  findOne(@Payload() id: number) {
    return this.loanService.findOne(id);
  }

  // @MessagePattern('updateLoan')
  // update(@Payload() updateLoanDto: UpdateLoanDto) {
  //   return this.loanService.update(updateLoanDto.id, updateLoanDto);
  // }
  //
  // @MessagePattern('removeLoan')
  // remove(@Payload() id: number) {
  //   return this.loanService.remove(id);
  // }
}
