import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  create(@Body() createLikeDto: any) {
    return this.likeService.create(createLikeDto);
  }

  @Get(':userId')
  findOne(@Param('userId') id: string) {
    return this.likeService.findMyLike(+id);
  }
}
