import { CreateVehicleRequest } from '../../shared/interfaces/vehicle.interface';

export class CreateVehicleDto implements CreateVehicleRequest {
  /**
  brand            String
  model            String
  version          String?
  year             Int
  category         Category
  consumptionCityG Float?
  consumptionHwyG  Float?
  consumptionCityE Float?
  consumptionHwyE  Float?
   */

  brand: string;
  model: string;
  version?: string;
  year: number;
  category: string;
  consumptionCityG?: number;
  consumptionHwyG?: number;
  consumptionCityE?: number;
  consumptionHwyE?: number;
}
