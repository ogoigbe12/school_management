import { IsNotEmpty } from 'class-validator';

export class manage_studentDto {
  @IsNotEmpty()
  StudentName: string;

  @IsNotEmpty()
  Email: string;

  @IsNotEmpty()
  PhoneNumber: string;

  @IsNotEmpty()
  BirthDate: string;

  @IsNotEmpty()
  Gender: string;

  @IsNotEmpty()
  StudentID: number;

  @IsNotEmpty()
  EntryYear: string;

  @IsNotEmpty()
  Semester: string;
}
