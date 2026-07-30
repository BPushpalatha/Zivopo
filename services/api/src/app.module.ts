import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServiceCategoriesModule } from './service-categories/service-categories.module';
import { ServiceRequestsModule } from './service-requests/service-requests.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ServiceCategoriesModule, ServiceRequestsModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
