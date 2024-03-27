import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}
  async create(createLoanDto: CreateLoanDto) {
    return this.prisma.loan.create({ data: createLoanDto });
  }

  findAll() {
    return this.prisma.loan.findMany();
  }

  findOne(id: number) {
    return this.prisma.loan.findUnique({ where: { id } });
  }

  // update(id: number, updateLoanDto: UpdateLoanDto) {
  //   return `This action updates a #${id} loan`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} loan`;
  // }
}
