import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accountant } from 'typeorm/accountant.entities';
import { AccountantController } from './controller/accountant/accountant.controller';
import { AccountantService } from './service/accountant/accountant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accountant]),
    JwtModule.register({
      secret: 'process.env.SECRET',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AccountantController],
  providers: [AccountantService],
})
export class AccountantModule {}
