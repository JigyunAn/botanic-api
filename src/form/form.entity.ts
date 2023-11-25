import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Form extends BaseModel {
  @Column({ type: 'varchar' })
  business_number: string;

  @Column({ type: 'varchar' })
  owner_name: string;

  @Column({ type: 'varchar' })
  owner_phone: string;

  @Column({ type: 'varchar' })
  store_name: string;

  @Column({ type: 'varchar' })
  store_address1: string;

  @Column({ type: 'varchar' })
  store_address2: string;

  @Column({ type: 'bool', nullable: false, default: false })
  accept: boolean;
}
