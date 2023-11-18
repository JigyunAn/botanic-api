import { Entity, Column, Index, ManyToOne } from 'typeorm';
import { Point } from 'geojson';
import { BaseModel } from '../common/entity/base.entity';
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

  @Column({ type: 'varchar' })
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

  @Column({ type: 'varchar' })
  address1: string;

  @Column({ type: 'varchar' })
  address2: string;

  //   @ManyToOne(() => Review, (review) => review.user)
  //   review: Review[];
}
