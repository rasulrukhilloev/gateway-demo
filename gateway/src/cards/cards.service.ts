import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom, Observable, Subscription } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';
import { CreateCardDto } from './dto/create-card.dto';
import { uuid } from 'uuidv4';

@Injectable()
export class CardsService {
  constructor(
    @Inject('CARDS_SERVICE') private readonly cardsClient: ClientKafka,
  ) {}

  // create(cardsDto: CreateCardDto, userId: number) {
  //   //Observable<any>
  //   const referenceId = uuid();
  //
  //   const cardData = {
  //     ...cardsDto,
  //     userId,
  //     referenceId,
  //   };
  //   this.cards_client.emit('create-card', cardData); //.pipe(timeout(12000));
  //   return { referenceId };
  // }

  create(cardsDto: CreateCardDto, userId: number) {
    // const data = JSON.stringify({ ...cardsDto, userId });
    this.cardsClient.emit('create-card', { ...cardsDto, userId });
  }

  getCards(): Promise<any> {
    const res = this.cardsClient.send('get-cards', {});
    return lastValueFrom(res);
  }

  // checkStatus(referenceId: string) {
  //   return this.cardsClient.send('check-card-status', referenceId);
  // }
}
