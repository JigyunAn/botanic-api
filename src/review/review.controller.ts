import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('image', 10))
  create(
    @Body() createReviewDto: any,
    @UploadedFiles() file: Array<Express.MulterS3.File>,
  ) {
    return this.reviewService.create(createReviewDto, file);
  }

  @Get('store/:storeId')
  findAll(@Param('storeId') storeId: string) {
    return this.reviewService.findByStore(+storeId);
  }

  @Get('all/:limit')
  findReview(@Param('limit') limit: string) {
    return this.reviewService.findReview(+limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: any) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
