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

  async create(body: any) {
    const { lat, lng, ...data } = body;
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
    await this.sendEmail(userInfo.email, userInfo.id);
    return userInfo;
  }

  async loginByEmail(body: any) {
    try {
      const { email, password } = body;

      const userInfo = await this.repository.findOne({ where: { email } });

      if (userInfo.verify == false) {
        return { msg: 'Not authenticated' };
      }
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

  async getEmailConfirmToken(email: string) {
    try {
      return sign({ email }, process.env.ACCESS_SECRET as string, {
        expiresIn: '15m',
      });
    } catch (err) {
      console.log(err);
    }
  }

  async emailVerify(userId: number, token: string) {
    const tokenData = verify(token, process.env.ACCESS_SECRET as string);

    if (tokenData) {
      this.update(userId, { verify: true });
      return `<script type="text/javascript">alert("Successfully verified"); window.location="/"; </script>`;
    } else {
      return `<script type="text/javascript">alert("Not verified"); window.location="/"; </script>`;
    }
  }

  async sendEmail(email: string, userId: number) {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    const token = await this.getEmailConfirmToken(email);
    const url = `${process.env.SERVER_URL}/user/confirm/${token}/${userId}`;

    const mailOptions = {
      to: `${email}`,
      subject: '가입 인증 메일',
      html: `
    메일인증 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
    인증은 메일전송후 15분까지 유효합니다.<br/>
    <a style="color: #FFF; text-decoration: none; text-align: center;" href=${url} target="_blank">
        <p style="display: inline-block; width: 210px; height: 45px; margin: 30px 5px 40px; background: #3bc9db; line-height: 45px; vertical-align: middle; font-size: 16px;">
            메일 인증
        </p>
    </a>
      `,
    };
    await transporter.sendMail(mailOptions);
  }

  async resetPassword(body: any) {
    const { email } = body;

    const userInfo = await this.repository.findOne({ where: { email } });

    if (!userInfo) {
      return { msg: 'Invalid email' };
    }

    const newPassword = (await this.getEmailConfirmToken(email)).slice(-6);
    await this.snedResetPasswordEmail(email, newPassword);
    return;
  }

  async snedResetPasswordEmail(email: string, password: string) {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      to: `${email}`,
      subject: '비빌번호 초기화 메일',
      html: `
  새로운 비밀번호는 ${password} 입니다.<br/>  `,
    };
    await transporter.sendMail(mailOptions);
  }
}
