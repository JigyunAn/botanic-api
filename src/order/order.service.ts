import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreService } from 'src/store/store.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private repository: Repository<Order>,
    private userService: UserService,
    private storeService: StoreService,
  ) {}

  async create(body: any) {
    const { userId, storeId, ...data } = body;

    const [user, store] = await Promise.all([
      this.userService.findOne(userId),
      this.storeService.findOne(storeId),
    ]);
    data.user = user;
    data.store = store;

    return await this.repository.save(data);
  }

  async findByUser(userId) {
    return await this.repository.find({
      where: [
        { user: { id: userId }, reserv: 0 },
        { user: { id: userId }, reserv: 1 },
      ],
    });
  }

  async findCancelOrder(userId) {
    return await this.repository.find({
      where: [{ user: { id: userId }, status: 0 }],
    });
  }
}
