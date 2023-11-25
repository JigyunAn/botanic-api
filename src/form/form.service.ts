import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './form.entity';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private repository: Repository<Form>,
  ) {}
  async create(body: any) {
    return await this.repository.save(body);
  }

  findAll() {
    return `This action returns all form`;
  }

  findOne(id: number) {
    return `This action returns a #${id} form`;
  }

  async update(id: number, body: any) {
    return await this.repository.update(id, body);
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
