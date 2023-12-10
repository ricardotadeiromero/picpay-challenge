import { IsNotEmpty, IsNumber } from "class-validator";

export class AddBalanceDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
