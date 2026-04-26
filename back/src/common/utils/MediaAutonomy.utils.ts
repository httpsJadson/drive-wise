import { Vehicle } from "@prisma/client";

export type AutonomyResponse = {
    consumtionMediaG?: number | null;
    consumtionMediaE?: number | null;
    consumtionMediaD?: number | null;
}

export const calculateMediaAutonomy = async (
  vehicle: Partial<Vehicle>, 
): Promise<AutonomyResponse> => {

    const calc = (city: number | null | undefined, hwy: number | null | undefined): number | null => {     
      if (city == null || hwy == null) return null; 
      return (city + hwy) / 2;
    };

    return {
        consumtionMediaG: calc(vehicle.consumptionCityG, vehicle.consumptionHwyG),
        consumtionMediaE: calc(vehicle.consumptionCityE, vehicle.consumptionHwyE),
        consumtionMediaD: calc(vehicle.consumptionCityD, vehicle.consumptionHwyD),
    };
}