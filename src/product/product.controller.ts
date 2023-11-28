import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('image', 10))
  create(
    @Body() createProductDto: any,
    @UploadedFiles() file: Array<Express.MulterS3.File>,
  ) {
    return this.productService.create(createProductDto, file);
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('image', 10))
  update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFiles() file: Array<Express.MulterS3.File>,
  ) {
    return this.productService.update(+id, body, file);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
