import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { UserModule } from 'src/user/user.module';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), UserModule, StoreModule],
  controllers: [LikeController],
  providers: [LikeService],
})
@Module({})
export class LikeModule {}
