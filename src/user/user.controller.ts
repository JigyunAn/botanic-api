import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('image', 10))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFiles() file: Array<Express.MulterS3.File>,
  ) {
    return this.userService.create(createUserDto, file);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.userService.loginByEmail(body);
  }

  @Post('oauth_login')
  oauthLogin(@Body() body: any) {
    return this.userService.loginByOauthId(body);
  }

  @Get(':id')
  findUserInfo(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post('confirm')
  findUserByEmail(@Body() body: any) {
    return this.userService.confirmUserByEmail(body);
  }

  @Post('confirm/:token')
  confirmUser(@Param('token') token: string) {
    return this.userService.emailVerify(token);
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('image', 10))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles() file: Array<Express.MulterS3.File>,
  ) {
    return this.userService.update(+id, updateUserDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
