import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudentDto } from 'src/student/dto/student.dto';
import { LoginStudentDto } from 'src/student/dto/studentlogin.dto';
import { StudentService } from 'src/student/service/student/student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}
  @Post('studentsignup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() studentDto: StudentDto) {
    const newUser = await this.studentService.createStudent(studentDto);
    if (newUser) return { msg: 'Account created', redirect: '/login' };
    return new HttpException(
      'student with email already exists',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Post('studentlogin')
  async login(@Body() loginDto: LoginStudentDto) {
    const newLogin = await this.studentService.studentlogin(loginDto);
    if (newLogin.token)
      return { msg: 'student signed in', token: newLogin.token };
    if (newLogin.err) throw new HttpException(newLogin.err, newLogin.status);
  }
  @Get()
  async get() {
    const student = await this.studentService.getStudent();
    if (student.length > 0) return student;
    throw new HttpException('student not found', HttpStatus.NOT_FOUND);
  }
  @Get(':id')
  async getById(@Param('id') id: number) {
    const getId = await this.studentService.getStudentById(id);
    if (!getId)
      throw new HttpException(
        'student with id not found',
        HttpStatus.NOT_FOUND,
      );
    return getId;
  }
  @Delete(':id')
  async deleted(@Param('id') id: number) {
    const DeleteStudent = await this.studentService.DeleteStudent(id);
    if (DeleteStudent) return DeleteStudent;
    throw new HttpException(
      'you cannot perform this action',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
