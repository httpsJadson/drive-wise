import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { $Enums, Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class VehiclesService {
  private readonly logger = new Logger(VehiclesService.name);

  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  private readonly vehicleSelect = {
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
  } as const;

  async create(createVehicleDto: CreateVehicleDto) {
    try {
      const category = this.normalizeCategory(createVehicleDto.category as string);

      return await this.prismaService.vehicle.create({
        data: {
          ...createVehicleDto,
          category,
        },
        select: this.vehicleSelect,
      });
    } catch (error) {
      this.handlePrismaError(error, 'create');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.vehicle.findMany({
        select: this.vehicleSelect,
      });
    } catch (error) {
      this.handlePrismaError(error, 'findAll');
    }
  }

  async findAllByBrand(brand: string) {
    try {
      return await this.prismaService.vehicle.findMany({
        where: { brand },
        select: this.vehicleSelect,
      });
    } catch (error) {
      this.handlePrismaError(error, 'findAllByBrand');
    }
  }

  async findAllByModel(model: string) {
    try {
      return await this.prismaService.vehicle.findMany({
        where: { model },
        select: this.vehicleSelect,
      });
    } catch (error) {
      this.handlePrismaError(error, 'findAllByModel');
    }
  }

  async findAllByYear(year: number) {
    try {
      return await this.prismaService.vehicle.findMany({
        where: { year },
        select: this.vehicleSelect,
      });
    } catch (error) {
      this.handlePrismaError(error, 'findAllByYear');
    }
  }

  async findAllByCategory(category: string) {
    try {
      const normalizedCategory = category.toUpperCase();

      if (!this.isValidCategory(normalizedCategory)) {
        throw new NotFoundException(`Category "${category}" not found`);
      }

      return await this.prismaService.vehicle.findMany({
        where: { category: normalizedCategory as $Enums.Category },
        select: this.vehicleSelect,
      });
    } catch (error) {
      this.handlePrismaError(error, 'findAllByCategory');
    }
  }

  async findOne(id: number) {
    try {
      const vehicle = await this.prismaService.vehicle.findUnique({
        where: { id },
        select: this.vehicleSelect,
      });

      if (!vehicle) {
        throw new NotFoundException(`Vehicle with id ${id} not found`);
      }

      return vehicle;
    } catch (error) {
      this.handlePrismaError(error, 'findOne');
    }
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    try {
      return await this.prismaService.vehicle.update({
        where: { id },
        data: updateVehicleDto,
        select: this.vehicleSelect,
      });
    } catch (error) {
      this.handlePrismaError(error, 'update');
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.vehicle.delete({
        where: { id },
      });
    } catch (error) {
      this.handlePrismaError(error, 'remove');
    }
  }

  private normalizeCategory(category: string): $Enums.Category {
    const normalized = category.toUpperCase();

    if (!this.isValidCategory(normalized)) {
      throw new BadRequestException(`Category "${category}" is invalid`);
    }

    return normalized as $Enums.Category;
  }

  private isValidCategory(category: string): category is $Enums.Category {
    return Object.values($Enums.Category).includes(category as $Enums.Category);
  }

  private handlePrismaError(error: unknown, action: string): never {
    this.logger.error(`Error on ${action}`, error as Error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new BadRequestException('Duplicate record or unique constraint violation');
        case 'P2025':
          throw new NotFoundException('Vehicle not found');
        default:
          throw new InternalServerErrorException(
            `Prisma error on ${action}: ${error.message}`,
          );
      }
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new BadRequestException(error.message);
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      throw new InternalServerErrorException(error.message);
    }

    if (error instanceof NotFoundException) {
      throw error;
    }

    if (error instanceof Error) {
      throw new InternalServerErrorException(error.message);
    }

    throw new InternalServerErrorException(
      `Unexpected error on ${action}`,
    );
  }
}
