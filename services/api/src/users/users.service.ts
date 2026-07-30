import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmailOrPhone(value: string) {
    return this.prisma.user.findFirst({ where: { OR: [{ email: value }, { phone: value }] } });
  }

  async create({ password, ...data }: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(password, 10),
        role: (data.role as 'CUSTOMER' | 'PROFESSIONAL' | 'STUDENT' | 'ADMIN' | 'SUPER_ADMIN') || 'CUSTOMER',
      },
    });
  }
}
