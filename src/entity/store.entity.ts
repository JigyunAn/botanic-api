import { Entity, Column, Point, Index } from "typeorm";
import { BaseModel } from "../common/entity/base.entity";
@Entity()
export class Store extends BaseModel {
  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column("jsonb", { default: [] })
  image: string[];

  @Column({ type: "varchar" })
  store_info_text: string;

  @Column({ type: "int" })
  delivery_price: number;

  @Column({ type: "varchar" })
  role: string;

  @Index({ spatial: true })
  @Column({
    type: "geography",
    spatialFeatureType: "Point",
    srid: 4326,
    nullable: true,
  })
  location: Point;

  @Column({ type: "varchar" })
  address: string;
}
