import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { FacultyDto } from 'src/faculty/dto/faculty.dto';
import { Repository } from 'typeorm';
import { Faculty } from 'typeorm/faculty.entities';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/faculty/dto/loginfaculty.dto';

@Injectable()
export class FacultyService {
  constructor(
    @InjectRepository(Faculty) private facultyRepository: Repository<Faculty>,
    private jwtService: JwtService,
  ) {}

  async createFaculty(facultyDetails: FacultyDto) {
    const findEamil = await this.facultyRepository.findBy({
      Email: facultyDetails.Email,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(facultyDetails.password, salt);
    facultyDetails.password = hashedPassword;
    if (findEamil.length === 0)
      return await this.facultyRepository.save(facultyDetails);
  }
  async facultyLogin(loginDetails: LoginDto) {
    const login = await this.facultyRepository.findOneBy({
      username: loginDetails.username,
    });
    if (login) {
      const passwordCheck = await bcrypt.compare(
        loginDetails.password,
        login.password,
      );
      if (passwordCheck) {
        const token = this.jwtService.sign({
          id: login.id,
          username: login.username,
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
  async getfaculty() {
    return await this.facultyRepository.find();
  }
  async getFacultyById(id: number): Promise<Faculty> {
    return await this.facultyRepository.findOneBy({ id: id });
  }
  async DeleteFaculty(id: number) {
    const findUser = await this.facultyRepository.findOneBy({ id: id });
    if (!findUser)
      return new HttpException(
        'admin with id does not exit',
        HttpStatus.NOT_FOUND,
      );
    return this.facultyRepository.delete({ id: id });
  }
}
