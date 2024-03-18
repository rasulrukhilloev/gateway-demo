import { Controller } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @MessagePattern('create-card')
  async create(cardDto: CreateCardDto) {
    return this.cardsService.create(cardDto);
  }

  @MessagePattern('get-cards')
  async getCards() {
    return this.cardsService.findAll();
  }

  // @EventPattern()
}
