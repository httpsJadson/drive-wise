import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, MaxLength, Min } from 'class-validator';
import { Category } from '../vehicle.category.enum';
import { $Enums } from '@prisma/client';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'Vehicle brand',
    example: 'Toyota',
  })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    description: 'Vehicle model',
    example: 'Corolla',
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiPropertyOptional({
    description: 'Vehicle version or trim',
    example: 'XRS',
  })
  @IsString()
  @IsOptional()
  version?: string;

  @ApiProperty({
    description: 'Vehicle year',
    example: 2023,
  })
  @Min(1900, { message: 'Year must be at least 1900' })
  @Max(2030, { message: 'Year cannot be greater than 2030' })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'Vehicle category',
    enum: Category,
    example: Category.SEDAN,
  })
  @IsNotEmpty()
  @IsEnum(Category)
  category: $Enums.Category;

  @ApiPropertyOptional({
    description: 'City consumption with gasoline',
    example: 10.5,
  })
  @IsNumber()
  @IsOptional()
  consumptionCityG?: number;

  @ApiPropertyOptional({
    description: 'Highway consumption with gasoline',
    example: 12.8,
  })
  @IsNumber()
  @IsOptional()
  consumptionHwyG?: number;

  @ApiPropertyOptional({
    description: 'City consumption with ethanol',
    example: 8.7,
  })
  @IsNumber()
  @IsOptional()
  consumptionCityE?: number;

  @ApiPropertyOptional({
    description: 'Highway consumption with ethanol',
    example: 10.2,
  })
  @IsNumber()
  @IsOptional()
  consumptionHwyE?: number;

    @ApiPropertyOptional({
    description: 'City consumption with diesel',
    example: 8.7,
  })
  @IsNumber()
  @IsOptional()
  consumptionCityD?: number;

  @ApiPropertyOptional({
    description: 'Highway consumption with diesel',
    example: 10.2,
  })
  @IsNumber()
  @IsOptional()
  consumptionHwyD?: number;
}
