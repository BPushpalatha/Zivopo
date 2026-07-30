import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateServiceRequestDto {
  @IsString()
  @IsNotEmpty()
  serviceSlug!: string;

  @IsString()
  @IsNotEmpty()
  serviceTitle!: string;

  @IsString()
  @IsNotEmpty()
  scheduledFor!: string;

  @IsString()
  @IsNotEmpty()
  duration!: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
