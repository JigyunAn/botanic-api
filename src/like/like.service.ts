import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreService } from 'src/store/store.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Like } from './like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private repository: Repository<Like>,
    private userService: UserService,
    private storeService: StoreService,
  ) {}

  async create(body: any) {
    const { userId, storeId } = body;
    const existData = await this.findOneLike(userId, storeId);
    if (existData) {
      return this.remove(existData.id);
    }
    const [user, store] = await Promise.all([
      this.userService.findOne(userId),
      this.storeService.findOne(storeId),
    ]);
    const data = {
      user,
      store,
    };
    return await this.repository.save(data);
  }

  async findMyLike(user_id) {
    return await this.repository.find({
      where: { user: { id: user_id } },
      relations: { store: true },
    });
  }

  async findOneLike(userId, storeId) {
    return await this.repository.findOne({
      where: { user: { id: userId }, store: { id: storeId } },
    });
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
