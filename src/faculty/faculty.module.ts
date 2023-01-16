import { Module } from '@nestjs/common';
import { FacultyController } from './controller/faculty/faculty.controller';
import { FacultyService } from './service/faculty/faculty.service';

@Module({
  controllers: [FacultyController],
  providers: [FacultyService]
})
export class FacultyModule {}
