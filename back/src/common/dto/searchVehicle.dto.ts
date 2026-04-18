import { IsOptional, IsString, IsInt, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Category } from '../enum/vehicle.category.enum';
import { VehicleOrderFields } from '../enum/orderVehicle.enum';
import { OrderDirection } from '../enum/order.enum';
import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { PaginationDto } from './pagination.dto';

export class SearchVehicleDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Termo de busca (marca, modelo ou ano)', example: 'Toyota Corolla 2024' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Categoria do veículo', enum: Category })
  @IsOptional()
  @IsString()
  @IsEnum(Category)
  category?: Category;

  @ApiPropertyOptional({ description: 'Ano do veículo', example: 2024 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;

  @ApiPropertyOptional({ enum: VehicleOrderFields })
  @IsOptional()
  @IsEnum(VehicleOrderFields)
  orderBy?: VehicleOrderFields = VehicleOrderFields.MODEL;

  @ApiPropertyOptional({ description: 'Filtrar veículos sem consumo cadastrado (todos os consumos nulos)', example: true })
  @IsOptional()
  @Type(() => Boolean)
  noConsumption?: boolean;

  @ApiPropertyOptional({ description: 'Filtrar veículos sem fullName cadastrado', example: true })
  @IsOptional()
  @Type(() => Boolean)
  noFullName?: boolean;
}