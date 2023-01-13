import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  FullName: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
