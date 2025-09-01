import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RolesE } from 'src/types/enums';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column({
    type: 'enum',
    enum: RolesE,
    default: RolesE.CLIeNET,
  })
  role: RolesE;
}
