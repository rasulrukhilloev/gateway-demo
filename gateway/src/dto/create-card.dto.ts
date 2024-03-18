import {IsNotEmpty, IsNumber, IsString, Length, MaxLength, MinLength} from "class-validator";
import {Type} from "class-transformer";

export class CreateCardDto {

    @IsNotEmpty()
    @IsNumber()
    number: number;

    @IsNotEmpty()
    @IsString()
    expDate: string;

    @IsNotEmpty()
    @IsString()
    issueDate: string
}
