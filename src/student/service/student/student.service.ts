import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'typeorm/student.entities';
import * as bcrypt from 'bcrypt';
import { StudentDto } from 'src/student/dto/student.dto';
import { LoginStudentDto } from 'src/student/dto/studentlogin.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    private jwtService: JwtService,
  ) {}
  async createStudent(studentDetails: StudentDto) {
    const findEamil = await this.studentRepository.findBy({
      Email: studentDetails.Email,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(studentDetails.password, salt);
    studentDetails.password = hashedPassword;
    if (findEamil.length === 0)
      return await this.studentRepository.save(studentDetails);
  }
  async studentlogin(loginDetails: LoginStudentDto) {
    const studentLogin = await this.studentRepository.findOneBy({
      username: loginDetails.username,
    });
    if (studentLogin) {
      const passwordCheck = await bcrypt.compare(
        loginDetails.password,
        studentLogin.password,
      );
      if (passwordCheck) {
        const token = this.jwtService.sign({
          id: studentLogin.id,
          username: studentLogin.username,
        });
        return { token: token };
      }
      return { err: 'incorrect password', status: HttpStatus.BAD_REQUEST };
    }
    return {
      err: 'employee with email not found',
      status: HttpStatus.NOT_FOUND,
    };
  }

  async getStudent() {
    return await this.studentRepository.find();
  }

  async getStudentById(id: number): Promise<Student> {
    return await this.studentRepository.findOneBy({ id: id });
  }

  async DeleteStudent(id: number) {
    const findUser = await this.studentRepository.findOneBy({ id: id });
    if (!findUser)
      return new HttpException(
        'admin with id does not exit',
        HttpStatus.NOT_FOUND,
      );
    return this.studentRepository.delete({ id: id });
  }
}
