import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginAccountantDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
