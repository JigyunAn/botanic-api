import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getStoreDto } from './store-dto';
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

  async findStore(query: getStoreDto) {
    const { category, availableDay } = query;
    let qb = this.repository.createQueryBuilder('store');

    if (category) {
      qb = qb.andWhere(
        'EXISTS (SELECT 1 FROM jsonb_array_elements_text(store.category) val WHERE val::text::integer = ANY(:value))',
        { value: category },
      );
    }

    if (availableDay) {
      qb = qb.andWhere(
        'EXISTS (SELECT 1 FROM jsonb_array_elements_text(store.available_day) val WHERE val::text::integer = ANY(:value1))',
        { value1: availableDay },
      );
    }

    return await qb.getMany();
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async getDetailStore(storeId: number) {
    const storeData = await this.repository.findOne({
      where: { id: storeId },
      relations: { reviews: true },
    });
    const rate = parseFloat(this.getRate(storeData.reviews).toFixed(1));

    return { ...storeData, rate };
  }

  getRate(reviews: any) {
    if (!reviews) {
      return 0;
    }
    let sum = 0;
    for (const review of reviews) {
      sum += review.rate;
    }
    return sum / reviews.length;
  }

  update(id: number, updateStoreDto: any) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
