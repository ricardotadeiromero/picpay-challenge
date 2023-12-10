import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from 'src/auth/guards/role-auth.guard';
import { roles } from 'src/auth/decorators/role.decorator';
import { AddBalanceDto } from './dto/addBalanceDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return await this.userService.create(dto);
  }

  @Post('balance')
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @roles('commom')
  async addBalance(@CurrentUser() user, @Body() dto: AddBalanceDto) {
    return await this.userService.addBalance(user.id, dto.value);
  }
}
