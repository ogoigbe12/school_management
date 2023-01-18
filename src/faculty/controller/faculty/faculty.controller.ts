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
import { FacultyDto } from 'src/faculty/dto/faculty.dto';
import { LoginDto } from 'src/faculty/dto/loginfaculty.dto';
import { FacultyService } from 'src/faculty/service/faculty/faculty.service';

@Controller('faculty')
export class FacultyController {
  constructor(private facultyService: FacultyService) {}

  @Post('facultysignup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() facutlydto: FacultyDto) {
    const newUser = await this.facultyService.createFaculty(facutlydto);
    if (newUser) return { msg: 'Account created', redirect: '/login' };
    return new HttpException(
      'facutly with email already exists',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Post('facultylogin')
  async login(@Body() facultydto: LoginDto) {
    const newLogin = await this.facultyService.facultyLogin(facultydto);
    if (newLogin.token)
      return { msg: 'faculty signed in', token: newLogin.token };
    if (newLogin.err) throw new HttpException(newLogin.err, newLogin.status);
  }
  @Get()
  async get() {
    const faculty = await this.facultyService.getfaculty();
    if (faculty.length > 0) return faculty;
    throw new HttpException('faculty login not found', HttpStatus.NOT_FOUND);
  }
  @Get(':id')
  async getById(@Param('id') id: number) {
    const getId = await this.facultyService.getFacultyById(id);
    if (!getId)
      throw new HttpException('faculty login not found', HttpStatus.NOT_FOUND);
    return getId;
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    const deleteFaculty = await this.facultyService.DeleteFaculty(id);
    if (deleteFaculty) return deleteFaculty;
    throw new HttpException(
      'you cannot perform this action',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
