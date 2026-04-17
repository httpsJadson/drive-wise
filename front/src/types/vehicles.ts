export const VehicleCategory = {
  HATCH: 'HATCH',
  SEDAN: 'SEDAN',
  SUV: 'SUV',
  PICKUP: 'PICKUP',
  ELECTRIC: 'ELECTRIC'
} as const;

export type VehicleCategory = typeof VehicleCategory[keyof typeof VehicleCategory];

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  category: VehicleCategory;
  consumptionCityG?: number;
  consumptionHwyG?: number;
  consumptionCityE?: number;
  consumptionHwyE?: number;
  consumptionCityD?: number;
  consumptionHwyD?: number;
}