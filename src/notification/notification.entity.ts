import { Entity, Column } from 'typeorm';
import { BaseModel } from '../common/entity/base.entity';
@Entity()
export class Notification extends BaseModel {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  body: string;
}
