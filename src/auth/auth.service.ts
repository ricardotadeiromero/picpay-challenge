import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { UserToken } from 'src/user/entities/userToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(user: User): Promise<UserToken> {
    const payload = { email: user.email, sub: user.id, type: user.type };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
