import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.userService.loginByEmail(body);
  }

  @Post('oauth_login')
  oauthLogin(@Body() body: any) {
    return this.userService.loginByOauthId(body);
  }

  @Post('reset_password')
  resetPassword(@Body() body: any) {
    return this.userService.resetPassword(body);
  }

  @Get(':id')
  findUserInfo(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('confirm/:token/:userId')
  confirmUser(@Param('token') token: string, @Param('userId') userId: string) {
    return this.userService.emailVerify(+userId, token);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
