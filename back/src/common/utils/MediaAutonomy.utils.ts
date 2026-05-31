import { Consumption } from "@prisma/client";

export type AutonomyResponse = {
    consumtionMediaG?: number | null;
    consumtionMediaE?: number | null;
    consumtionMediaD?: number | null;
}

export const calculateMediaAutonomy = async (
  consumption: Partial<Consumption> | null | undefined,
): Promise<AutonomyResponse> => {

    const calc = (city: number | null | undefined, hwy: number | null | undefined): number | null => {     
      if (city == null || hwy == null) return null; 
      return (city + hwy) / 2;
    };

    return {
        consumtionMediaG: calc(consumption?.consumptionCityG, consumption?.consumptionHwyG),
        consumtionMediaE: calc(consumption?.consumptionCityE, consumption?.consumptionHwyE),
        consumtionMediaD: calc(consumption?.consumptionCityD, consumption?.consumptionHwyD),
    };
}