import { Module } from '@nestjs/common';
import { StudentService } from './service/student/student.service';
import { StudentController } from './controller/student/student.controller';

@Module({
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}
