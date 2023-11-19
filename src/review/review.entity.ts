import { BaseModel } from 'src/common/entity/base.entity';
import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Review extends BaseModel {
  @Column({ type: 'varchar' })
  text: string;

  @Column('jsonb', { default: [] })
  image: string[];

  @Column({ type: 'int' })
  rate: number;

  @ManyToOne(() => User, (el) => el.reviews)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Store, (el) => el.reviews)
  @JoinColumn({ name: 'store_id' })
  store: Store;
}
