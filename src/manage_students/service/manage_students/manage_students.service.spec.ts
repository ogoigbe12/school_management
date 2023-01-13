import { Test, TestingModule } from '@nestjs/testing';
import { ManageStudentsService } from './manage_students.service';

describe('ManageStudentsService', () => {
  let service: ManageStudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageStudentsService],
    }).compile();

    service = module.get<ManageStudentsService>(ManageStudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
