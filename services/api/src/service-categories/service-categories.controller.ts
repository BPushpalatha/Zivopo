import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ServiceCategoriesService } from './service-categories.service';

@ApiTags('service-categories')
@Controller('service-categories')
export class ServiceCategoriesController {
  constructor(private readonly categoriesService: ServiceCategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get service categories' })
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get service category by slug' })
  async findOne(@Param('slug') slug: string) {
    return this.categoriesService.findBySlug(slug);
  }
}
