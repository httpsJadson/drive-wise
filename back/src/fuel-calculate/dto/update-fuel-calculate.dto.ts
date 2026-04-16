import { PartialType } from '@nestjs/swagger';
import { CreateFuelCalculateDto } from './create-fuel-calculate.dto';

export class UpdateFuelCalculateDto extends PartialType(CreateFuelCalculateDto) {}
