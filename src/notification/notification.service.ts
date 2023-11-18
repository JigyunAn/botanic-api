import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private repository: Repository<Notification>,
  ) {}
  async create(body: any) {
    return await this.repository.save(body);
  }

  async findAll() {
    return await this.repository.find();
  }
}
