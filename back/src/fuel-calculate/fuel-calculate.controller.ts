import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuelCalculateService } from './fuel-calculate.service';
import { CreateFuelCalculateDto } from './dto/create-fuel-calculate.dto';
import { UpdateFuelCalculateDto } from './dto/update-fuel-calculate.dto';

@Controller('fuel-calculate')
export class FuelCalculateController {
  constructor(private readonly fuelCalculateService: FuelCalculateService) {}

  @Post()
  create(@Body() createFuelCalculateDto: CreateFuelCalculateDto) {
    return this.fuelCalculateService.create(createFuelCalculateDto);
  }

  @Get()
  findAll() {
    return this.fuelCalculateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fuelCalculateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFuelCalculateDto: UpdateFuelCalculateDto) {
    return this.fuelCalculateService.update(+id, updateFuelCalculateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fuelCalculateService.remove(+id);
  }
}
