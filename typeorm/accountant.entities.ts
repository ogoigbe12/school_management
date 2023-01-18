import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Accountant {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  LastName: string;
  @Column()
  FirstName: string;
  @Column('bigint')
  PhoneNumber: number;
  @Column()
  Email: string;
  @Column()
  Gender: string;
  @Column()
  username: string;
  @Column()
  password: string;
}
