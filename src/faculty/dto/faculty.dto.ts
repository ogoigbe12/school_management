import { IsNotEmpty, MinLength } from 'class-validator';

export class FacultyDto {
  @IsNotEmpty()
  LastName: string;
  @IsNotEmpty()
  FirstName: string;
  @IsNotEmpty()
  PhoneNumber: number;
  @IsNotEmpty()
  Email: string;
  @IsNotEmpty()
  Gender: string;
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
