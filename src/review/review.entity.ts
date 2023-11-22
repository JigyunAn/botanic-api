import { BaseModel } from 'src/common/entity/base.entity';
import { Order } from 'src/order/order.entity';
import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Review extends BaseModel {
  @Column({ type: 'varchar' })
  text: string;

  @Column('jsonb', { default: [] })
  image: string[];

  @Column({ type: 'float8' })
  rate: number;

  @ManyToOne(() => User, (el) => el.reviews)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Store, (el) => el.reviews)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @ManyToOne(() => Order, (el) => el.reviews)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
