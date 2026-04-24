import { Injectable } from '@nestjs/common';
import { calcularConsumoEReais } from '../common/utils/fuelCalculate.utils';

@Injectable()
export class FuelCalculateService {
  create(createFuelCalculateDto: any) {
    return 'This action adds a new fuelCalculate';
  }

  async realizarTesteMockado() {
    // Dados para o cálculo
    const distancia = 318; 
    const precos = { gasolina: 6, etanol: 3.90, diesel: 6.00 };
    const medias = { gasolina: 11, etanol: 7, diesel: 12 };

    // Chama a função do calc.ts
    const resultado = calcularConsumoEReais(distancia, precos, medias);

    console.log(JSON.stringify(resultado, null, 2));

    return {
      status: "Sucesso",
      mensagem: "Cálculo de combustível (Gasolina, Etanol e Diesel)",
      resultado: {
        distanciaPercorrida: `${distancia} km`,
        detalhes: resultado
      }
    };
  }
}