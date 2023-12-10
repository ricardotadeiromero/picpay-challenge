import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { AuthRequest } from './entities/authRequest';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.login(req.user);
    res.cookie('access_token', access_token, { httpOnly: true });
    return access_token;
  }
}
