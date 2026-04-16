import { Injectable } from '@nestjs/common';
import { CreateFuelCalculateDto } from './dto/create-fuel-calculate.dto';
import { UpdateFuelCalculateDto } from './dto/update-fuel-calculate.dto';

@Injectable()
export class FuelCalculateService {
  create(createFuelCalculateDto: CreateFuelCalculateDto) {
    return 'This action adds a new fuelCalculate';
  }

  findAll() {
    return `This action returns all fuelCalculate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fuelCalculate`;
  }

  update(id: number, updateFuelCalculateDto: UpdateFuelCalculateDto) {
    return `This action updates a #${id} fuelCalculate`;
  }

  remove(id: number) {
    return `This action removes a #${id} fuelCalculate`;
  }
}
