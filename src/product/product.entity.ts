import { BaseModel } from 'src/common/entity/base.entity';
import { Store } from 'src/store/store.entity';
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Product extends BaseModel {
  @Column({ type: 'varchar' })
  name: string;

  @Column('jsonb', { default: [] })
  image: string[];

  @Column({ type: 'int' })
  price: number;

  @Column('jsonb', { default: [] })
  category: number[];

  @ManyToOne(() => Store, (el) => el.products)
  @JoinTable({ name: 'store_id' })
  store: Store;

  @OneToMany(() => Product_option, (el) => el.product)
  product_options: Product_option[];
}

@Entity()
export class Product_option extends BaseModel {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(() => Product, (el) => el.product_options)
  @JoinTable({ name: 'product_id' })
  product: Product;
}
