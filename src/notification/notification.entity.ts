import { User } from 'src/user/user.entity';
import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import { BaseModel } from '../common/entity/base.entity';
@Entity()
export class Notification extends BaseModel {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  body: string;

  @ManyToOne(() => User, (el) => el.notifications)
  @JoinTable({ name: 'user_id' })
  user: User;
}
