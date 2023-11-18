import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async create(body: any) {
    const { lat, lng, ...data } = body;

    if (lat) {
      const location = {
        type: 'Point',
        coordinates: [lng, lat],
      } as any;
      data.location = location;
    }
    return await this.repository.save(data);
  }

  async loginByEmail(body: any) {
    const { email } = body;
    return await this.repository.findOne({ where: { email } });
  }

  async loginByOauthId(body: any) {
    const { oauthId } = body;
    return await this.repository.findOne({ where: { oauth_id: oauthId } });
  }

  async getUserInfo(id: number) {
    return await this.repository.findOne(id);
  }

  async update(id: number, body: any) {
    return await this.repository.update(id, body);
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
