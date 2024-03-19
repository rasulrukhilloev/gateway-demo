import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  private statusStore = {}; //processing, ready, failed, unknown

  async create(createCardDto: CreateCardDto) {
    const { referenceId, ...cardDto } = createCardDto;
    this.statusStore[referenceId] = 'processing';

    //sleep simulation
    await new Promise((resolve) => setTimeout(resolve, 10000));

    const res = await this.prisma.card.create({ data: cardDto });

    this.statusStore[referenceId] = 'ready';
    return;
  }

  findAll() {
    return this.prisma.card.findMany({ where: { status: 'active' } });
  }

  findOne(id: number) {
    return this.prisma.card.findUnique({ where: { id: id } });
  }

  remove(id: number) {
    return this.prisma.card.delete({ where: { id: id } });
  }

  async checkStatus(referenceId: string): Promise<any> {
    return this.statusStore[referenceId] || 'unknown';
  }
}
