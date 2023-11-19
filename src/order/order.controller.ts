import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: any) {
    return this.orderService.create(createOrderDto);
  }

  // @Get()
  // findAll() {
  //   return this.orderService.findAll();
  // }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.orderService.findByUser(+userId);
  }
  @Get('/cancel/:userId')
  findCancelOrder(@Param('userId') userId: string) {
    return this.orderService.findCancelOrder(+userId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: any) {
  //   return this.orderService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  //}
}
