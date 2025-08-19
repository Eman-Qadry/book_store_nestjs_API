import { Controller } from '@nestjs/common';
import { Post, Body, Get, Param,Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  @Post('update')
  update(@CurrentUser() user: any, @Body() dto: UpdateUserDto) {
    return this.userService.update(user.userId, dto);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'customer')
  @Get('profile/:id')
  getProfile(@Param('id') id: number) {
    return this.userService.getProfile(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
