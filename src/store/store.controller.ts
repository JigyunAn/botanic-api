import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { getStoreDto } from './store-dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@Body() createStoreDto: any) {
    return this.storeService.create(createStoreDto);
  }

  @Get()
  findOne(@Query() query: getStoreDto) {
    return this.storeService.findStore(query);
  }

  @Get('/detail/:id')
  getDetailStore(@Param('id') id: number) {
    return this.storeService.getDetailStore(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
