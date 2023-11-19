import { BaseModel } from 'src/common/entity/base.entity';
import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Order extends BaseModel {
  @Column({ type: 'varchar' })
  rec_name: string;

  @Column({ type: 'varchar' })
  rec_phone: string;

  @Column('jsonb', { default: [] })
  order_json: string[];

  @Column({ type: 'varchar', nullable: true })
  ribbon_text: string;

  @Column({ type: 'varchar', nullable: true })
  req_text: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'int' })
  total_price: number;

  @Column({ type: 'int' })
  reserv: number;

  @Column({ type: 'int' })
  status: number;

  @Column({ type: 'timestamp', nullable: true })
  delivery_want_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  delivery_at: Date;

  @ManyToOne(() => User, (el) => el.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Store, (el) => el.orders)
  @JoinColumn({ name: 'store_id' })
  store: Store;
}
