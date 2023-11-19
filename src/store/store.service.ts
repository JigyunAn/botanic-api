import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Store } from './store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private repository: Repository<Store>,
  ) {}
  async create(body: any) {
    return await this.repository.save(body);
  }

  async findByCategory(category: number) {
    return await this.repository
      .createQueryBuilder('cg')
      .where(`cg.category @> '${category}'`)
      .getMany();
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  findMyLike(user_id: number) {
    return `This action returns a #${user_id} store`;
  }

  update(id: number, updateStoreDto: any) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
