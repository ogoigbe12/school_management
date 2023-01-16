import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'typeorm/admin.entities';
import { manage_student } from 'typeorm/manage_students.entities';
import { AdminModule } from './admin/admin.module';
import { ManageStudentsModule } from './manage_students/manage_students.module';
import { FacultyModule } from './faculty/faculty.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB,
      entities: [Admin, manage_student],
      synchronize: true,
    }),
    AdminModule,
    ManageStudentsModule,
    FacultyModule,
    StudentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
