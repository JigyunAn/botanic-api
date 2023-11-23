import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as md5 from 'md5';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async create(body: any) {
    const { lat, lng, ...data } = body;

    data.password = md5(body.password);

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
    try {
      const { email, password } = body;

      const userInfo = await this.repository.findOne({ where: { email } });

      if (md5(password) === userInfo.password) {
        return userInfo;
      } else {
        return { msg: 'Invalid password' };
      }
    } catch (err) {
      return { msg: 'Invalid email' };
    }
  }

  async loginByOauthId(body: any) {
    const { oauthId } = body;
    return await this.repository.findOne({ where: { oauth_id: oauthId } });
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, body: any) {
    return await this.repository.update(id, body);
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
