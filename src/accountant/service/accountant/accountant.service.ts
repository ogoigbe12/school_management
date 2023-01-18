import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accountant } from 'typeorm/accountant.entities';
import * as bcrypt from 'bcrypt';
import { LoginAccountantDto } from 'src/accountant/dto/loginaccountant.dto';
import { AccountantDto } from 'src/accountant/dto/accountant.dto';

@Injectable()
export class AccountantService {
  constructor(
    @InjectRepository(Accountant)
    private accountantRepository: Repository<Accountant>,
    private jwtService: JwtService,
  ) {}
  async createAccountant(accountantDetails: AccountantDto) {
    const findEamil = await this.accountantRepository.findBy({
      Email: accountantDetails.Email,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(accountantDetails.password, salt);
    accountantDetails.password = hashedPassword;
    if (findEamil.length === 0)
      return await this.accountantRepository.save(accountantDetails);
  }
  async accountantlogin(loginDetails: LoginAccountantDto) {
    const accountantLogin = await this.accountantRepository.findOneBy({
      username: loginDetails.username,
    });
    if (accountantLogin) {
      const passwordCheck = await bcrypt.compare(
        loginDetails.password,
        accountantLogin.password,
      );
      if (passwordCheck) {
        const token = this.jwtService.sign({
          id: accountantLogin.id,
          Email: accountantLogin.Email,
        });
        return { token: token };
      }
      return { err: 'incorrect password', status: HttpStatus.BAD_REQUEST };
    }
    return {
      err: 'accountant with email not found',
      status: HttpStatus.NOT_FOUND,
    };
  }

  async getAccountant() {
    return await this.accountantRepository.find();
  }

  async getAccountantById(id: number): Promise<Accountant> {
    return await this.accountantRepository.findOneBy({ id: id });
  }

  async DeleteAccountant(id: number) {
    const findUser = await this.accountantRepository.findOneBy({ id: id });
    if (!findUser)
      return new HttpException(
        'accountant with id does not exit',
        HttpStatus.NOT_FOUND,
      );
    return this.accountantRepository.delete({ id: id });
  }
}
