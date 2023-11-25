import { BaseModel } from 'src/common/entity/base.entity';
import { Product } from 'src/product/product.entity';
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';

@Entity()
export class ProductOption extends BaseModel {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(() => Product, (el) => el.product_options)
  @JoinTable({ name: 'product_id' })
  product: Product;
}
