import { Module } from '@nestjs/common';
import { AccountantController } from './controller/accountant/accountant.controller';
import { AccountantService } from './service/accountant/accountant.service';

@Module({
  controllers: [AccountantController],
  providers: [AccountantService]
})
export class AccountantModule {}
