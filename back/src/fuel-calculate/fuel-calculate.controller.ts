import { Controller, Get, Post, Body } from '@nestjs/common';
import { FuelCalculateService } from './fuel-calculate.service';

@Controller('fuel-calculate')
export class FuelCalculateController {
  constructor(private readonly fuelCalculateService: FuelCalculateService) {}

  @Post()
  create(@Body() createFuelCalculateDto: any) {
    return this.fuelCalculateService.create(createFuelCalculateDto);
  }

  @Get('teste')
  runTest() {
    return this.fuelCalculateService.realizarTesteMockado();
  }
}