import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faculty } from 'typeorm/faculty.entities';
import { FacultyController } from './controller/faculty/faculty.controller';
import { FacultyService } from './service/faculty/faculty.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Faculty]),
    JwtModule.register({
      secret: 'process.env.SECRET',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [FacultyController],
  providers: [FacultyService],
})
export class FacultyModule {}
