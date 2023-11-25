import { Module } from '@nestjs/common';
import { ProductOptionService } from './product_option.service';
import { ProductOptionController } from './product_option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOption } from './product_option.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOption]), ProductModule],
  controllers: [ProductOptionController],
  providers: [ProductOptionService],
})
export class ProductOptionModule {}
