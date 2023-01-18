import { IsNotEmpty, MinLength } from 'class-validator';

export class AdminLoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
