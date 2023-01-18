import { Module } from '@nestjs/common';
import { StudentService } from './service/student/student.service';
import { StudentController } from './controller/student/student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'typeorm/student.entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    JwtModule.register({
      secret: 'process.env.SECRET',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
