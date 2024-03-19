import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsString()
  expDate: string;

  @IsNotEmpty()
  @IsString()
  issueDate: string;

  @IsNotEmpty()
  @IsString()
  referenceId: string;
}
