import { Inject, Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class LoanService {
  constructor(
    @Inject('LOAN_SERVICE') private readonly loanClient: ClientProxy,
  ) {}
  create(loanDto: CreateLoanDto, userId: number) {
    this.loanClient.emit('createLoan', { ...loanDto, userId });
  }

  getLoans(): Observable<any> {
    return this.loanClient.send('findAllLoan', {});
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} loan`;
  // }
  //
  // update(id: number, updateLoanDto: UpdateLoanDto) {
  //   return `This action updates a #${id} loan`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} loan`;
  // }
}
