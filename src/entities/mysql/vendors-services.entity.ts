import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vendors_services')
export class VendorsServices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vendor_id: number;

  @Column()
  service_id: number;
}
