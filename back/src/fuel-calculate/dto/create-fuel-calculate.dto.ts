import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFuelCalculateDto {

  @ApiProperty({ description: 'Origem', example: 'Unianteneu-lagoa' })
  @IsNotEmpty()
  @IsString()
  from: string;

  @ApiProperty({ description: 'Destino', example: 'Unianteneu-lagoa' })
  @IsNotEmpty()
  @IsString()
  to: string;

  @ApiProperty({ description: 'Veículo', example: 589 })
  @IsNotEmpty()
  vehicle: number;
  
}
