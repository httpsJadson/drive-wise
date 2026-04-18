import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { SearchVehicleDto } from '../common/dto/searchVehicle.dto';
import { AuthTokenGuard } from '../common/guards/authToken.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { JobRole } from '../common/enum/jobRole.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @UseGuards(AuthTokenGuard)
  @Roles(JobRole.ADMIN)
  @ApiBearerAuth()
  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  findAll(@Query() query: SearchVehicleDto) {
    return this.vehiclesService.findAll(query);
  }

  @UseGuards(AuthTokenGuard)
  @Roles(JobRole.ADMIN)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @UseGuards(AuthTokenGuard)
  @Roles(JobRole.ADMIN)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @UseGuards(AuthTokenGuard)
  @Roles(JobRole.ADMIN)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }

  @UseGuards(AuthTokenGuard)
  @Roles(JobRole.ADMIN)
  @ApiBearerAuth()
  @Delete('year/:year/category/:category')
  removeAny(
    @Param('year', ParseIntPipe) year: number,
    @Param('category') category?: string,
  ) {
    return this.vehiclesService.removeAny(year, category);
  }
}
