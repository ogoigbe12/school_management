import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { manage_student } from 'typeorm/manage_students.entities';
import { ManageStudentsController } from './controller/manage_students/manage_students.controller';
import { ManageStudentsService } from './service/manage_students/manage_students.service';

@Module({
  imports: [TypeOrmModule.forFeature([manage_student])],
  controllers: [ManageStudentsController],
  providers: [ManageStudentsService],
})
export class ManageStudentsModule {}
