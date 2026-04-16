import { CreateVehicleRequest } from '../../shared/interfaces/vehicle.interface';

export class CreateVehicleDto implements CreateVehicleRequest {
  brand: string;
  model: string;
  version?: string;
  year: number;
  category: string;
  consumptionCityG?: number;
  consumptionHwyG?: number;
  consumptionCityE?: number;
  consumptionHwyE?: number;

  constructor(data?: Partial<CreateVehicleRequest>) {
    if (data) {
      this.brand = data.brand!;
      this.model = data.model!;
      this.version = data.version;
      this.year = data.year!;
      this.category = data.category!;
      this.consumptionCityG = data.consumptionCityG;
      this.consumptionHwyG = data.consumptionHwyG;
      this.consumptionCityE = data.consumptionCityE;
      this.consumptionHwyE = data.consumptionHwyE;
    }
  }
}
