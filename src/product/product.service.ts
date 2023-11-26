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

  async create(body: any, file?: Array<Express.MulterS3.File>) {
    const { storeId, ...data } = body;
    if (file && file.length > 0) {
      const image = [];
      for (const imageData of file) {
        image.push(imageData.location);
      }
      data.image = image;
    }

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

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
