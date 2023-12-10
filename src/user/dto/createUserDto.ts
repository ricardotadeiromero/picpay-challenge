import { IsNotEmpty, IsString } from 'class-validator';
import { UserType } from '../entities/user';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  type: UserType | string;
  @IsNotEmpty()
  @IsString()
  document: string;
}
