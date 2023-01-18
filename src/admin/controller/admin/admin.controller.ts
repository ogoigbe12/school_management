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
import { adminDto } from 'src/admin/dto/admin.dto';
import { AdminLoginDto } from 'src/admin/dto/login.dto';
import { AdminService } from 'src/admin/service/admin/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('adminsignup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() AdminDto: adminDto) {
    const newUser = await this.adminService.createAdmin(AdminDto);
    if (newUser) return { msg: 'Account created', redirect: '/login' };
    return new HttpException(
      'admin with email already exists',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Post('adminlogin')
  async login(@Body() loginDto: AdminLoginDto) {
    const newLogin = await this.adminService.adminlogin(loginDto);
    if (newLogin.token)
      return { msg: 'admin signed in', token: newLogin.token };
    if (newLogin.err) throw new HttpException(newLogin.err, newLogin.status);
  }
  @Get()
  async getAdmin() {
    const admins = await this.adminService.getAdmin();
    if (admins.length > 0) return admins;
    throw new HttpException('admin not found', HttpStatus.NOT_FOUND);
  }
  @Get(':id')
  async getAdminById(@Param('id') id: number) {
    const getId = await this.adminService.getAdminById(id);
    if (!getId)
      throw new HttpException('admin not found', HttpStatus.NOT_FOUND);
    return getId;
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    const deleteAdmin = await this.adminService.DeleteAmin(id);
    if (deleteAdmin) return deleteAdmin;
    throw new HttpException(
      'you cannot perform this action',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
