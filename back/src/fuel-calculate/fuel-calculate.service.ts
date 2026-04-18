import { Injectable } from '@nestjs/common';
import { CreateFuelCalculateDto } from './dto/create-fuel-calculate.dto';

@Injectable()
export class FuelCalculateService {
  create(createFuelCalculateDto: CreateFuelCalculateDto) {
    return 'This action adds a new fuelCalculate';
  }
}
