import { Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DepositService {
  constructor(private prisma: PrismaService) {}

  create(createDepositDto: CreateDepositDto) {
    return this.prisma.deposit.create({ data: createDepositDto });
  }

  findAll() {
    return this.prisma.deposit.findMany();
  }

  findOne(id: number) {
    return this.prisma.deposit.findUnique({ where: { id } });
  }
  //
  // update(id: number, updateDepositDto: UpdateDepositDto) {
  //   return `This action updates a #${id} deposit`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} deposit`;
  // }
}
