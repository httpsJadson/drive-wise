import { IsOptional, IsString, IsInt, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Category } from '../enum/vehicle.category.enum';
import { OrderDirection, VehicleOrderFields } from '../enum/orderVehicle.enum';
import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class SearchVehicleDto {
  @ApiPropertyOptional({ description: 'Termo de busca (marca, modelo ou ano)', example: 'Toyota Corolla 2024' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Categoria do veículo', enum: ['SUV', 'HATCH', 'SEDAN'] })
  @IsOptional()
  @IsString()
  @IsEnum(Category)
  category?: Category;

  @ApiPropertyOptional({ description: 'Ano do veículo', example: 2024 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 20;

  @ApiPropertyOptional({ enum: VehicleOrderFields })
  @IsOptional()
  @IsEnum(VehicleOrderFields)
  orderBy?: VehicleOrderFields = VehicleOrderFields.MODEL;

  @ApiPropertyOptional({ enum: OrderDirection, default: 'asc' })
  @IsOptional()
  @IsEnum(OrderDirection)
  orderDir?: OrderDirection = OrderDirection.ASC;
}