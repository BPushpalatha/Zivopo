import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServiceCategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.serviceCategory.findMany({ orderBy: { createdAt: 'asc' } });
  }

  async findBySlug(slug: string) {
    return this.prisma.serviceCategory.findUnique({ where: { slug } });
  }
}
