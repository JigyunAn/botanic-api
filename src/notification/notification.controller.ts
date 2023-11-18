import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() body: any) {
    return this.notificationService.create(body);
  }

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }
}
