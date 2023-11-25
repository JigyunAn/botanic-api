import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { ProductOption } from './product_option.entity';

@Injectable()
export class ProductOptionService {
  constructor(
    @InjectRepository(ProductOption)
    private repository: Repository<ProductOption>,
    private productService: ProductService,
  ) {}
  async create(body: any) {
    const { productId, ...data } = body;

    const product = await this.productService.findOne(productId);
    data.product = product;

    return await this.repository.save(data);
  }

  async update(id: number, body: any) {
    return await this.repository.update(id, body);
  }

  findAll() {
    return `This action returns all productOption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} productOption`;
  }
}
