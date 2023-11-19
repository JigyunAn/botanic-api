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
    const [user, store] = await Promise.all([
      await this.userService.findOne(userId),
      await this.storeService.findOne(storeId),
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

  findAll() {
    return `This action returns all like`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto: any) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
