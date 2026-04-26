import { Injectable } from '@nestjs/common';
import { CalculateConsumeTotal } from '../common/utils/fuelCalculate.utils';
import { CreateFuelCalculateDto } from './dto/create-fuel-calculate.dto';

@Injectable()
export class FuelCalculateService {
  calculate(createFuelCalculateDto: CreateFuelCalculateDto) {
    return "this calculate consume total";
  }
}