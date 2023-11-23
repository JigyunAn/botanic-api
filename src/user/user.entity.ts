import { Entity, Column, Index, ManyToOne, OneToMany } from 'typeorm';
import { Point } from 'geojson';
import { BaseModel } from '../common/entity/base.entity';
import { Like } from 'src/like/like.entity';
import { Review } from 'src/review/review.entity';
import { Order } from 'src/order/order.entity';
//import { Review } from './review.entity';

@Entity()
export class User extends BaseModel {
  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  oauth_id: string;

  @Column('jsonb', { default: [] })
  image: string[];

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point;

  @Column({ type: 'varchar', nullable: true })
  address1: string;

  @Column({ type: 'varchar', nullable: true })
  address2: string;

  @Column({ type: 'bool', nullable: false, default: false })
  verify: boolean;

  @Column({ type: 'varchar', nullable: true })
  device_token: string;

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
