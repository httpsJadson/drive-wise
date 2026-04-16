import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get('brand/:brand')
  findAllByBrand(@Param('brand') brand: string) {
    return this.vehiclesService.findAllByBrand(brand);
  }

  @Get('year/:year')
  findAllByYear(@Param('year', ParseIntPipe) year: number) {
    return this.vehiclesService.findAllByYear(year);
  }

  @Get('model/:model')
  findAllByModel(@Param('model') model: string) {
    return this.vehiclesService.findAllByModel(model);
  }

  @Get('category/:category')
  findAllByCategory(@Param('category') category: string) {
    return this.vehiclesService.findAllByCategory(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }

  @Delete('year/:year/category/:category')
  removeAny(
    @Param('year', ParseIntPipe) year: number,
    @Param('category') category?: string,
  ) {
    return this.vehiclesService.removeAny(year, category);
  }
}
