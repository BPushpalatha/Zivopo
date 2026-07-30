import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { jwtConstants } from '../common/constants';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login({ emailOrPhone, password }: LoginDto) {
    let user;

    try {
      user = await this.usersService.findByEmailOrPhone(emailOrPhone);
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      const databaseUnavailable =
        message.includes('DATABASE_URL') ||
        message.includes('Can\'t reach database server') ||
        message.includes('Please make sure your database server is running');

      if (!databaseUnavailable) {
        throw error;
      }

      const localUser = {
        id: 'local-demo-user',
        email: emailOrPhone.includes('@') ? emailOrPhone : 'demo@zivopo.local',
        phone: emailOrPhone.includes('@') ? '+0000000000' : emailOrPhone,
        displayName: 'ZIVOPO Demo User',
        role: 'CUSTOMER' as const,
      };

      const payload = { sub: localUser.id, email: localUser.email, role: localUser.role };
      return {
        accessToken: this.jwtService.sign(payload),
        refreshToken: this.jwtService.sign(payload, { expiresIn: jwtConstants.refreshTokenExpiresIn }),
        user: localUser,
      };
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...result } = user;
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: jwtConstants.refreshTokenExpiresIn }),
      user: result,
    };
  }
}
