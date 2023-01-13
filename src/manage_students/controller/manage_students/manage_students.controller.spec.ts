import { Test, TestingModule } from '@nestjs/testing';
import { ManageStudentsController } from './manage_students.controller';

describe('ManageStudentsController', () => {
  let controller: ManageStudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageStudentsController],
    }).compile();

    controller = module.get<ManageStudentsController>(ManageStudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
