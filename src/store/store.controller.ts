import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { StoreService } from './store.service';
import { getStoreDto } from './store-dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('image', 10))
  create(
    @Body() createStoreDto: any,
    @UploadedFiles() file: Array<Express.MulterS3.File>,
  ) {
    return this.storeService.create(createStoreDto, file);
  }

  @Get()
  findOne(@Query() query: getStoreDto) {
    return this.storeService.findStore(query);
  }

  @Get('/detail/:id')
  getDetailStore(@Param('id') id: number) {
    return this.storeService.getDetailStore(id);
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('image', 10))
  update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFiles() file: Array<Express.MulterS3.File>,
  ) {
    return this.storeService.update(+id, body, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
