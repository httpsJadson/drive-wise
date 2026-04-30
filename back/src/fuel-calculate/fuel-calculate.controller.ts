import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FuelCalculateService } from './fuel-calculate.service';
import { CreateFuelCalculateDto } from './dto/create-fuel-calculate.dto';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import { DailyQuotaGuard } from '../common/guards/dailyQuota.guard';
import { AuthTokenGuard } from '../common/guards/authToken.guard';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';

@Controller('fuel-calculate')
export class FuelCalculateController {
  constructor(private readonly fuelCalculateService: FuelCalculateService) {}

  
  @UseGuards(ThrottlerGuard, DailyQuotaGuard)
  @ApiBearerAuth()
  @Post()
  calculate(@Body() createFuelCalculateDto: CreateFuelCalculateDto) {
    return this.fuelCalculateService.calculate(createFuelCalculateDto);
  }

}
