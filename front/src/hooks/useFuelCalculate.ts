import { useState } from 'react';
import { FuelCalculateService } from '../services/fuelCalculate.service';
import type { FuelCalculate } from '../types/fuelCalculate';

/**
 * Hook customizado para lidar com o cálculo de combustível.
 * Ele gerencia o estado de carregamento, erros e os dados retornados pela API.
 *
 * @returns Um objeto contendo a função `calculate`, e os estados `isLoading`, `error`, e `data`.
 */
export const useFuelCalculate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null); // O tipo 'any' pode ser refinado se soubermos a estrutura exata do retorno

  /**
   * Executa a chamada à API para calcular o custo da rota.
   * @param fuelCalculateData - Os dados do formulário (origem, destino, id do veículo).
   */
  const calculate = async (fuelCalculateData: FuelCalculate) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await FuelCalculateService.calculate(fuelCalculateData);
      setData(result);
      console.log('Resultado do cálculo:', result); // Adicionado para depuração
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Ocorreu um erro ao calcular a rota.';
      setError(errorMessage);
      console.error('Erro no cálculo:', errorMessage); // Adicionado para depuração
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { calculate, isLoading, error, data };
};