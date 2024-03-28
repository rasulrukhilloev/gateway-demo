import { Inject, Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreateLoanDto } from '../loan/dto/create-loan.dto';
import { Observable } from 'rxjs';

@Injectable()
export class DepositService {
  constructor(
    @Inject('DEPOSIT_SERVICE') private readonly depositClient: ClientProxy,
  ) {}
  create(despositDto: CreateLoanDto, userId: number) {
    this.depositClient.emit('createDeposit', { ...despositDto, userId });
  }

  findAll(): Observable<any> {
    return this.depositClient.send('findAllDeposit', {});
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} deposit`;
  // }
  //
  // update(id: number, updateDepositDto: UpdateDepositDto) {
  //   return `This action updates a #${id} deposit`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} deposit`;
  // }
}
