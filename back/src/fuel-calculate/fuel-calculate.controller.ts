import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuelCalculateService } from './fuel-calculate.service';
import { CreateFuelCalculateDto } from './dto/create-fuel-calculate.dto';

@Controller('fuel-calculate')
export class FuelCalculateController {
  constructor(private readonly fuelCalculateService: FuelCalculateService) {}

  @Post()
  create(@Body() createFuelCalculateDto: CreateFuelCalculateDto) {
    return this.fuelCalculateService.create(createFuelCalculateDto);
  }

}
