import { Controller } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @EventPattern('create-card')
  async create(cardDto: CreateCardDto) {
    return this.cardsService.create(cardDto);
  }

  @MessagePattern('get-cards')
  async getCards() {
    return this.cardsService.findAll();
  }

  @MessagePattern('check-card-status')
  async checkCardStatus(referenceId: string): Promise<any> {
    const status = await this.cardsService.checkStatus(referenceId);
    return { referenceId, status };
  }

  // @EventPattern()
}
