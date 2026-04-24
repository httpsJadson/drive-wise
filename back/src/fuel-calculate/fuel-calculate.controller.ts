import { Controller, Get, Post, Body } from '@nestjs/common';
import { FuelCalculateService } from './fuel-calculate.service';
import { CreateFuelCalculateDto } from './dto/create-fuel-calculate.dto'; // Importação que ele quer

@Controller('fuel-calculate')
export class FuelCalculateController {
  constructor(private readonly fuelCalculateService: FuelCalculateService) {}

  @Post()
  create(@Body() createFuelCalculateDto: CreateFuelCalculateDto) { // Usando o DTO
    return this.fuelCalculateService.create(createFuelCalculateDto);
  }

  // Mantenha o seu teste aqui embaixo para você conseguir ver no localhost
  @Get('teste')
  runTest() {
    return this.fuelCalculateService.runMockedByTest();
  }
}