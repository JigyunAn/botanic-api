import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { UserModule } from 'src/user/user.module';
import { StoreModule } from 'src/store/store.module';
import { OrderModule } from 'src/order/order.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    UserModule,
    StoreModule,
    OrderModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const s3 = new S3Client({
          region: 'ap-northeast-2',
          credentials: {
            accessKeyId: configService.get('AWS_S3_ACCESS_KEY'),
            secretAccessKey: configService.get('AWS_S3_SECRET_ACCESS_KEY'),
          },
        });

        return {
          storage: multerS3({
            s3,
            bucket: configService.get('AWS_S3_BUCKET'),
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: function (req, file, cb) {
              const fileName = `images/${uuidv4()}-${file.originalname}`;

              cb(null, fileName);
            },
          }),
          limits: {
            files: 10,
          },
          fileFilter(req, file, callback) {
            callback(null, true);
          },
        };
      },
    }),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
