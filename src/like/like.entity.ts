import { BaseModel } from 'src/common/entity/base.entity';
import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Like extends BaseModel {
  @ManyToOne(() => User, (el) => el.likes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Store, (el) => el.likes)
  @JoinColumn({ name: 'store_id' })
  store: Store;
}
