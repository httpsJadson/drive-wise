export interface Vehicle {
  id: number;
  fullName: string;
}

export interface VehicleCreate {

    brand: string,
    model: string,
    version: string,
    year: number,
    category: string,
    consumptionCityG?: number,
    consumptionHwyG?: number,
    consumptionCityE?: number,
    consumptionHwyE?: number,
    consumptionHwyD?: number,
    consumptionCityD?: number,

}