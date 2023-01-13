import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class manage_student {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  StudentName: string;

  @Column()
  Email: string;

  @Column('bigint')
  PhoneNumber: number;

  @Column('date')
  BirthDate: string;

  @Column()
  Gender: string;

  @Column()
  StudentID: number;

  @Column()
  EntryYear: string;

  @Column()
  Semester: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number;
}
