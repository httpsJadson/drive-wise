import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class VehiclesService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    return await this.prismaService.vehicle.create({
      data: createVehicleDto,
      select: {
        id: true,
        brand: true,
        model: true,
        version: true,
        year: true,
        category: true,
        consumptionCityG: true,
        consumptionHwyG: true,
        consumptionCityE: true,
        consumptionHwyE: true,
        consumptionHwyD: true,
        consumptionCityD: true,
      }
    }); 
  }

  async findAll() {
    return await this.prismaService.vehicle.findMany({
      select: {
        id: true,
        brand: true,
        model: true,
        version: true,
        year: true,
        category: true,
        consumptionCityG: true,
        consumptionHwyG: true,
        consumptionCityE: true,
        consumptionHwyE: true,
        consumptionHwyD: true,
        consumptionCityD: true,
      }
    });
  }

  async findOne(id: number) {
    return await this.prismaService.vehicle.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        brand: true,
        model: true,
        version: true,
        year: true,
        category: true,
        consumptionCityG: true,
        consumptionHwyG: true,
        consumptionCityE: true,
        consumptionHwyE: true,
        consumptionHwyD: true,
        consumptionCityD: true,
      }
    });
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return await this.prismaService.vehicle.update({
      where: {
        id,
      },
      data: updateVehicleDto,
      select: {
        id: true,
        brand: true,
        model: true,
        version: true,
        year: true,
        category: true,
        consumptionCityG: true,
        consumptionHwyG: true,
        consumptionCityE: true,
        consumptionHwyE: true,
        consumptionHwyD: true,
        consumptionCityD: true,
      }
    });
  }

  async remove(id: number) {
    return await this.prismaService.vehicle.delete({
      where: {
        id,
      },
    });
  }
}
