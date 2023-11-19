import { Entity, Column, Index, OneToMany } from 'typeorm';
import { Point } from 'geojson';
import { BaseModel } from '../common/entity/base.entity';
import { Like } from 'src/like/like.entity';
import { Review } from 'src/review/review.entity';
import { Order } from 'src/order/order.entity';
@Entity()
export class Store extends BaseModel {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column('jsonb', { default: [] })
  image: string[];

  @Column({ type: 'varchar' })
  store_info_text: string;

  @Column({ type: 'int' })
  delivery_price: number;

  @Column({ type: 'varchar' })
  role: string;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point;

  @Column({ type: 'varchar' })
  address: string;

  @Column('jsonb', { default: [] })
  category: number[];

  @OneToMany(() => Like, (el) => el.store)
  likes: Like[];

  @OneToMany(() => Review, (el) => el.store)
  reviews: Review[];

  @OneToMany(() => Order, (el) => el.store)
  orders: Order[];
}
