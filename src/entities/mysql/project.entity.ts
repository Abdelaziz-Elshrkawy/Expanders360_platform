import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Service } from './service.entity';
import { User } from './users.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'client_id' })
  client: User;

  @Column()
  country: string;

  @ManyToMany(() => Service)
  @JoinTable({
    name: 'projects_services',
    joinColumn: { name: 'project_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'service_id', referencedColumnName: 'id' },
  })
  servicesNeeded: Service[];

  @Column({ type: 'float' })
  budget: number;

  @Column({ default: 'active' })
  status: string;
}
