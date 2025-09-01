import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { Vendor } from './vendor.entity';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.id)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Vendor, (vendor) => vendor.id)
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;

  @Column({ type: 'float' })
  score: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
