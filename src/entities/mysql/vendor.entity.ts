import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Country } from './country.entity';
import { Service } from './service.entity';

@Entity('vendors')
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ name: 'response_sla_hours', type: 'int', default: 24 })
  responseSlaHours: number;

  @ManyToMany(() => Country)
  @JoinTable({
    name: 'vendors_countries',
    joinColumn: { name: 'vendor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'country_id', referencedColumnName: 'id' },
  })
  countriesSupported: Country[];

  @ManyToMany(() => Service)
  @JoinTable({
    name: 'vendors_services',
    joinColumn: { name: 'vendor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'service_id', referencedColumnName: 'id' },
  })
  servicesOffered: Service[];
}
