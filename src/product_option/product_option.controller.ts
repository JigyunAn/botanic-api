import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductOptionService } from './product_option.service';

@Controller('product-option')
export class ProductOptionController {
  constructor(private readonly productOptionService: ProductOptionService) {}

  @Post()
  create(@Body() body: any) {
    return this.productOptionService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.productOptionService.update(+id, body);
  }

  @Get()
  findAll() {
    return this.productOptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productOptionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productOptionService.remove(+id);
  }
}
