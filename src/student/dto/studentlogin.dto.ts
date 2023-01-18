import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginStudentDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
