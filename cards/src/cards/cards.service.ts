import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {
  }
  create(createCardDto: CreateCardDto) {
    return this.prisma.card.create({data: createCardDto})
  }

  findAll() {
    return this.prisma.card.findMany({where: {status: 'active'}})
  }

  findOne(id: number) {
    return this.prisma.card.findUnique({where: {id: id}})
  }

  remove(id: number) {
    return this.prisma.card.delete({where: {id: id}})
  }
}
