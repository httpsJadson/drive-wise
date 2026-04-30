import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FuelCalculateModule } from './fuel-calculate/fuel-calculate.module';
import { ThrottlerModule } from '@nestjs/throttler/dist/throttler.module';
// import { DebugIpModule } from './debug-ip/debug-ip.module';

@Module({
  imports: [
    VehiclesModule,
    // DebugIpModule, 
    UsersModule, 
    AuthModule, 
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 20,
    }]),
    FuelCalculateModule
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
