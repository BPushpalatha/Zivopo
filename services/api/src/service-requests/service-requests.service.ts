import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';

type ServiceRequest = CreateServiceRequestDto & {
  id: string;
  status: 'PENDING';
  createdAt: string;
};

@Injectable()
export class ServiceRequestsService {
  private readonly requests: ServiceRequest[] = [];

  create(createServiceRequestDto: CreateServiceRequestDto) {
    const request: ServiceRequest = {
      id: randomUUID(),
      ...createServiceRequestDto,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    this.requests.unshift(request);
    return request;
  }

  findAll() {
    return this.requests;
  }
}
