import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreService } from 'src/store/store.service';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
    private storeService: StoreService,
  ) {}

  async create(body: any) {
    const { storeId, ...data } = body;

    const store = await this.storeService.findOne(storeId);
    data.store = store;
    return await this.repository.save(data);
  }

  async update(id: number, body: any) {
    return await this.repository.update(id, body);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
