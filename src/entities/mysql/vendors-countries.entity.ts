import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from './country.entity';
import { Vendor } from './vendor.entity';

@Entity('vendors_countries')
export class VendorsCountries {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor)
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
