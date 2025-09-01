import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Vendor } from '../../vendors/entities/vendor.entity';
import { Country } from '../../countries/entities/country.entity';

@Entity('vendors_countries')
export class VendorsCountries {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.vendorsCountries)
  vendor: Vendor;

  @ManyToOne(() => Country, (country) => country.vendorsCountries)
  country: Country;
}
