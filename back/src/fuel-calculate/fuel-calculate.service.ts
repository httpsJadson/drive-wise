import { Injectable } from '@nestjs/common';
import { calcularConsumoEReais } from '../common/utils/fuelCalculate.utils';

@Injectable()
export class FuelCalculateService {
  create(createFuelCalculateDto: any) {
    return 'This action adds a new fuelCalculate';
  }

  async runMockedByTest() {
    
    const distance = 26; 
    
    const prices = { 
      gasoline: 6.50, 
      ethanol: 3.90, 
      diesel: 6.00 
    };

    const consumptionMedia = { 
      consumtionMediaG: 35, 
      consumtionMediaE: 7, 
      consumtionMediaD: 12 
    };

  
    const result = calcularConsumoEReais(
      distance, 
      prices, 
      { 
        gasoline: consumptionMedia.consumtionMediaG, 
        ethanol: consumptionMedia.consumtionMediaE, 
        diesel: consumptionMedia.consumtionMediaD 
      }
    );

    return {
      status: "Success",
      message: "Fuel calculation (Gasoline, Ethanol and Diesel)",
      result: {
        distanceTraveled: `${distance} km`,
        consumtionMediaG: consumptionMedia.consumtionMediaG,
        consumtionMediaE: consumptionMedia.consumtionMediaE,
        consumtionMediaD: consumptionMedia.consumtionMediaD,
        details: result // Como a calc.ts agora é em inglês, passamos direto!
      }
    };
  }
}