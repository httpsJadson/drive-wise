// services/vehicles.api.ts
import { api } from './api';
import { type FuelCalculate } from '../types/fuelCalculate';

export const FuelCalculateService = {

  calculate: async (fuelCalculate: FuelCalculate): Promise<FuelCalculate> => {
    return api.post<FuelCalculate>('/fuel-calculate/', fuelCalculate, true);
  }
};