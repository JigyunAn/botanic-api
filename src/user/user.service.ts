import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as md5 from 'md5';
import * as nodeMailer from 'nodemailer';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async create(body: any, file?: Array<Express.MulterS3.File>) {
    const { lat, lng, ...data } = body;

    if (file && file.length > 0) {
      const image = [];
      for (const imageData of file) {
        image.push(imageData.location);
      }
      data.image = image;
    }

    const emailData = await this.repository.findOne({
      where: { email: data.email },
    });

    if (emailData) {
      return { msg: 'Email that is already' };
    }

    data.password = md5(body.password);

    if (lat) {
      const location = {
        type: 'Point',
        coordinates: [lng, lat],
      } as any;
      data.location = location;
    }

    const userInfo = await this.repository.save(data);
    return userInfo;
  }

  async confirmUserByEmail(body: any) {
    const { email, duplicate } = body;
    if (duplicate) {
      const user = await this.repository.find({ where: { email } });
      if (user.length != 0) {
        return { status: false };
      }
    }

    const token = await this.sendEmail(email);
    return { token, status: true };
  }

  async loginByEmail(body: any) {
    try {
      const { email, password } = body;

      const userInfo = await this.repository.findOne({ where: { email } });

      // if (userInfo.verify == false) {
      //   return { msg: 'Not authenticated' };
      // }
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

  async update(id: number, body: any, file?: Array<Express.MulterS3.File>) {
    const { original_image = '[]', ...data } = body;

    data.image = JSON.parse(original_image);
    if (file && file.length > 0) {
      const image = [];
      for (const imageData of file) {
        image.push(imageData.location);
      }
      data.image.push(...image);
    }

    return await this.repository.update(id, data);
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }

  async emailVerify(token: string) {
    const tokenData = verify(token, process.env.ACCESS_SECRET as string);

    if (tokenData) {
      return true;
    } else {
      return false;
    }
  }

  async sendEmail(email: string) {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    const token = await this.getEmailConfirmToken(email);

    const mailOptions = {
      to: `${email}`,
      subject: '인증코드 메일',
      html: `
      인증코드: ${token}
      `,
    };
    await transporter.sendMail(mailOptions);
    return token.slice(-5);
  }

  async getEmailConfirmToken(email: string) {
    try {
      return sign({ email }, process.env.ACCESS_SECRET as string, {
        expiresIn: '15m',
      });
    } catch (err) {
      console.log(err);
    }
  }
}
