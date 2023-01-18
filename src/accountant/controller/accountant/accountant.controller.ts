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
import { AccountantDto } from 'src/accountant/dto/accountant.dto';
import { LoginAccountantDto } from 'src/accountant/dto/loginaccountant.dto';
import { AccountantService } from 'src/accountant/service/accountant/accountant.service';

@Controller('accountant')
export class AccountantController {
  constructor(private accountantService: AccountantService) {}
  @Post('accountantsignup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() accountantDto: AccountantDto) {
    const newUser = await this.accountantService.createAccountant(
      accountantDto,
    );
    if (newUser) return { msg: 'Account created', redirect: '/login' };
    return new HttpException(
      'accountant with email already exists',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Post('accountantlogin')
  async login(@Body() loginDto: LoginAccountantDto) {
    const newLogin = await this.accountantService.accountantlogin(loginDto);
    if (newLogin.token)
      return { msg: 'accountant signed in', token: newLogin.token };
    if (newLogin.err) throw new HttpException(newLogin.err, newLogin.status);
  }
  @Get()
  async get() {
    const accountant = await this.accountantService.getAccountant();
    if (accountant.length > 0) return accountant;
    throw new HttpException('accountant not found', HttpStatus.NOT_FOUND);
  }
  @Get(':id')
  async getById(@Param('id') id: number) {
    const getId = await this.accountantService.getAccountantById(id);
    if (!getId)
      throw new HttpException(
        'accountant with id not found',
        HttpStatus.NOT_FOUND,
      );
    return getId;
  }
  @Delete(':id')
  async deleted(@Param('id') id: number) {
    const DeleteAccountant = await this.accountantService.DeleteAccountant(id);
    if (DeleteAccountant) return DeleteAccountant;
    throw new HttpException(
      'you cannot perform this action',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
