import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [VehiclesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
