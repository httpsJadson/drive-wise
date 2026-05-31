import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Category } from '../../common/enum/vehicle.category.enum';
import { $Enums } from '@prisma/client';
import { CreateConsumptionDto } from './create-consumption.dto';

export class CreateVehicleDto {
  @ApiProperty({ description: 'Vehicle brand', example: 'Toyota' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ description: 'Vehicle model', example: 'Corolla' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiPropertyOptional({ description: 'Vehicle version or trim', example: 'XRS' })
  @IsString()
  @IsOptional()
  version?: string;

  @ApiProperty({ description: 'Vehicle year', example: 2023 })
  @Min(1900, { message: 'Year must be at least 1900' })
  @Max(2030, { message: 'Year cannot be greater than 2030' })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ description: 'Vehicle category', enum: Category, example: Category.SEDAN })
  @IsNotEmpty()
  @IsEnum(Category)
  category: $Enums.Category;

  @ApiPropertyOptional({ type: () => CreateConsumptionDto })
  @ValidateNested()
  @Type(() => CreateConsumptionDto)
  @IsOptional()
  consumption?: CreateConsumptionDto;
}
