import { Module } from '@nestjs/common';
import { FuelCalculateService } from './fuel-calculate.service';
import { FuelCalculateController } from './fuel-calculate.controller';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [VehiclesModule],
  controllers: [FuelCalculateController],
  providers: [FuelCalculateService],
})
export class FuelCalculateModule {}