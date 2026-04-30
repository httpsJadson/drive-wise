import { Module } from '@nestjs/common';
import { FuelCalculateController } from '../fuel-calculate/fuel-calculate.controller';
import { DebugIpController } from './debug-ip.controller';

@Module({
  imports: [],
  controllers: [DebugIpController],
  providers: [],
})
export class DebugIpModule {}
