import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { ServiceRequestsService } from './service-requests.service';

@ApiTags('service-requests')
@Controller('service-requests')
export class ServiceRequestsController {
  constructor(private readonly serviceRequestsService: ServiceRequestsService) {}

  @Get()
  @ApiOperation({ summary: 'List created service requests' })
  async findAll() {
    return this.serviceRequestsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a service request' })
  async create(@Body() createServiceRequestDto: CreateServiceRequestDto) {
    return this.serviceRequestsService.create(createServiceRequestDto);
  }
}
