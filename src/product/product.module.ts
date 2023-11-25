import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), StoreModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
