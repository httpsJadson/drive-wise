import { Module } from '@nestjs/common';
import { FuelCalculateService } from './fuel-calculate.service';
import { FuelCalculateController } from './fuel-calculate.controller';

@Module({
  controllers: [FuelCalculateController],
  providers: [FuelCalculateService],
})
export class FuelCalculateModule {}