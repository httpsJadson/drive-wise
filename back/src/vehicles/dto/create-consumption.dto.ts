import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateConsumptionDto {
  @ApiPropertyOptional({ example: 10.5 })
  @IsNumber()
  @IsOptional()
  consumptionCityG?: number;

  @ApiPropertyOptional({ example: 12.8 })
  @IsNumber()
  @IsOptional()
  consumptionHwyG?: number;

  @ApiPropertyOptional({ example: 8.7 })
  @IsNumber()
  @IsOptional()
  consumptionCityE?: number;

  @ApiPropertyOptional({ example: 10.2 })
  @IsNumber()
  @IsOptional()
  consumptionHwyE?: number;

  @ApiPropertyOptional({ example: 8.7 })
  @IsNumber()
  @IsOptional()
  consumptionCityD?: number;

  @ApiPropertyOptional({ example: 10.2 })
  @IsNumber()
  @IsOptional()
  consumptionHwyD?: number;

  @ApiPropertyOptional({ example: 25.0 })
  @IsNumber()
  @IsOptional()
  consumptionCityW?: number;

  @ApiPropertyOptional({ example: 30.0 })
  @IsNumber()
  @IsOptional()
  consumptionHwyW?: number;
}
