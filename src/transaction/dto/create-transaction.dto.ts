import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  receiver: number;
  sender: number;
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
