import { Injectable } from '@nestjs/common';
import { CreateFuelCalculateDto } from './dto/create-fuel-calculate.dto';
import { CalculateConsumeTotal } from '../common/utils/fuelCalculate.utils';
import { DistanceCalculate } from '../common/utils/distanceCalculate.utils';
import { calculateMediaAutonomy } from '../common/utils/MediaAutonomy.utils';
import { VehiclesService } from '../vehicles/vehicles.service';


@Injectable()
export class FuelCalculateService {
  constructor(
    private readonly vehiclesService: VehiclesService,
  ) {}

  async calculate(createFuelCalculateDto: CreateFuelCalculateDto) {

    const prices = {
      gasoline: 6.97,
      ethanol: 4.69,
      diesel: 7.31,
    }
    const distance = await DistanceCalculate(
      createFuelCalculateDto.from,
      createFuelCalculateDto.to
    );

    const vehicle = await this.vehiclesService.findOne(Number(createFuelCalculateDto.vehicle));

    const media = await calculateMediaAutonomy(vehicle?.consumption);
    return await CalculateConsumeTotal(distance.distance, prices, media); 
  }
}
