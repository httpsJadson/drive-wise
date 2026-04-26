import { Injectable } from '@nestjs/common';
import { CreateFuelCalculateDto } from './dto/create-fuel-calculate.dto';
import { CalculateConsumeTotal } from '../common/utils/fuelCalculate.utils';

@Injectable()
export class FuelCalculateService {
  calculate(createFuelCalculateDto: CreateFuelCalculateDto) {
    return 'This action adds a new fuelCalculate';
  }
}
