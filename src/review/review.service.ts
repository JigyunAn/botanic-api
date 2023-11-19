import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderService } from 'src/order/order.service';
import { StoreService } from 'src/store/store.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private repository: Repository<Review>,
    private userService: UserService,
    private storeService: StoreService,
    private orderService: OrderService,
  ) {}

  async create(body: any) {
    const { userId, storeId, orderId, ...data } = body;
    const [user, store, order] = await Promise.all([
      this.userService.findOne(userId),
      this.storeService.findOne(storeId),
      this.orderService.findOne(orderId),
    ]);
    data.user = user;
    data.store = store;
    data.order = order;

    return await this.repository.save(data);
  }

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: any) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
