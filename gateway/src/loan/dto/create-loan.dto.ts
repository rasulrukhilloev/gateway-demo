import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLoanDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
