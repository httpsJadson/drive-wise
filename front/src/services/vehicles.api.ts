// services/vehicles.api.ts
import { api } from './api';
import { type Vehicle, type VehicleCreate } from '../types/vehicles';

export const VehiclesService = {

  search: async (searchTerm: string): Promise<Vehicle[]> => {
    // Adicionamos 'true' para exigir autenticação
    // Usamos <any> para permitir o acesso a .data na linha abaixo
    const data = await api.get<any>(`/vehicles?search=${searchTerm}`, true);
    
    // Garantimos que retornamos um array e mapeamos para o tipo Vehicle
    const rawList = Array.isArray(data) ? data : data.data || [];

    return rawList.map((vehicle: any) => ({
      id: vehicle.id,
      fullName: vehicle.fullName,
    }));
  },

  getById: async (id: number): Promise<VehicleCreate> => {
    return api.get<VehicleCreate>(`/vehicles/${id}`, true);
  },

  create: async (vehicleData: Partial<VehicleCreate>) => {
    return api.post<VehicleCreate>('/vehicles', vehicleData, true);
  },

  update: async (id: number, vehicleData: Partial<VehicleCreate>) => {
    return api.patch<VehicleCreate>(`/vehicles/${id}`, vehicleData, true);
  },

  delete: async (id: number) => {
    return api.delete<void>(`/vehicles/${id}`, true);
  },
};