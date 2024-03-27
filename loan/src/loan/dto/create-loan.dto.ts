import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLoanDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
