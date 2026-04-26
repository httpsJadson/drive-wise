export interface FuelCalculate {
  from: string;
  to: string;
  vehicle: number;
}

export interface FuelCost {
  liters: number;
  totalCost: number;
}

export interface FuelCalculateResponse {
  distance: {
    value: number;
    duration: number;
  };
  gasoline?: FuelCost;
  ethanol?: FuelCost;
  diesel?: FuelCost;
}