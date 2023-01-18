import { Test, TestingModule } from '@nestjs/testing';
import { AccountantController } from './accountant.controller';

describe('AccountantController', () => {
  let controller: AccountantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountantController],
    }).compile();

    controller = module.get<AccountantController>(AccountantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
