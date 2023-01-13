import { IsNotEmpty, MinLength } from 'class-validator';

export class adminDto {
  @IsNotEmpty()
  FullName: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
