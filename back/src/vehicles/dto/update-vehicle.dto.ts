import { PartialType } from '@nestjs/swagger';
import { CreateVehicleDto } from './create-vehicle.dto';
import { UpdateVehicleRequest } from '../../shared/interfaces/vehicle.interface';

export class UpdateVehicleDto
  extends PartialType(CreateVehicleDto)
  implements UpdateVehicleRequest {}
