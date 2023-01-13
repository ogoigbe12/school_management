import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { adminDto } from 'src/admin/dto/admin.dto';
import { Repository } from 'typeorm';
import { Admin } from 'typeorm/admin.entities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async createAdmin(adminDetails: adminDto) {
    const findEamil = await this.adminRepository.findBy({
      email: adminDetails.email,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminDetails.password, salt);
    adminDetails.password = hashedPassword;
    if (findEamil.length === 0)
      return await this.adminRepository.save(adminDetails);
  }
  async adminlogin(adminDetails: adminDto) {
    const adminLogin = await this.adminRepository.findOneBy({
      email: adminDetails.email,
    });
    if (adminLogin) {
      const passwordCheck = await bcrypt.compare(
        adminDetails.password,
        adminLogin.password,
      );
      if (passwordCheck) {
        const token = this.jwtService.sign({
          id: adminLogin.id,
          email: adminLogin.email,
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

  async getAdmin() {
    return await this.adminRepository.find();
  }

  async getAdminById(id: number): Promise<Admin> {
    return await this.adminRepository.findOneBy({ id: id });
  }

  async DeleteAmin(id: number) {
    const findUser = await this.adminRepository.findOneBy({ id: id });
    if (!findUser)
      return new HttpException(
        'admin with id does not exit',
        HttpStatus.NOT_FOUND,
      );
    return this.adminRepository.delete({ id: id });
  }
}
