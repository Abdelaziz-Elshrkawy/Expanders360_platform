import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Country } from './country.entity';
import { Vendor } from './vendor.entity';

@Entity('vendors_countries')
export class VendorsCountries {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.countriesSupported)
  vendor: Vendor;

  @ManyToOne(() => Vendor, (country) => country.countriesSupported)
  country: Country;
}
