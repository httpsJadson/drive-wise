export interface VehicleRequest {
  brand: string;
  model: string;
  version?: string;
  year: number;
  category: string; // Assuming Category is a string enum
  consumptionCityG?: number;
  consumptionHwyG?: number;
  consumptionCityE?: number;
  consumptionHwyE?: number;
}

export interface CreateVehicleRequest extends VehicleRequest {
  // All fields required for creation - inherits from VehicleRequest
}

export interface UpdateVehicleRequest extends Partial<VehicleRequest> {
  // All fields optional for updates - uses Partial<VehicleRequest>
}