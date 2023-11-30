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

  async create(body: any, file?: Array<Express.MulterS3.File>) {
    const { userId, storeId, orderId, ...data } = body;
    if (file && file.length > 0) {
      const image = [];
      for (const imageData of file) {
        image.push(imageData.location);
      }
      data.image = image;
    }

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

  async findByStore(storeId: number) {
    return await this.repository.find({
      where: { store: { id: storeId } },
      relations: { user: true },
    });
  }

  async findReview(limit: number) {
    return this.repository.find({
      take: limit || 10,
      relations: { user: true },
    });
  }

  async findBestReview(limit: number) {
    return this.repository.find({
      take: limit || 10,
      where: { rate: 5 },
      relations: { user: true },
    });
  }

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  async update(id: number, body: any, file?: Array<Express.MulterS3.File>) {
    const { original_image = '[]', ...data } = body;

    data.image = JSON.parse(original_image);
    if (file && file.length > 0) {
      const image = [];
      for (const imageData of file) {
        image.push(imageData.location);
      }
      data.image.push(...image);
    }

    return await this.repository.update(id, data);
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
