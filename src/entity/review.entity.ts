import { Entity, Column, Point, Index, OneToMany } from "typeorm";
import { BaseModel } from "../common/entity/base.entity";
import { User } from "./user.entity";

@Entity()
export class Review extends BaseModel {
  @Column({ type: "varchar" })
  text: string;

  @Column("jsonb", { default: [] })
  image: string[];

  @Column({ type: "int" })
  rate: number;

  @OneToMany(() => User, (user) => user.review)
  user: User;

  @Column({ type: "varchar" })
  nickname: string;
}
