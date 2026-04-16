import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FuelCalculateModule } from './fuel-calculate/fuel-calculate.module';

@Module({
  imports: [VehiclesModule, UsersModule, AuthModule, FuelCalculateModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
