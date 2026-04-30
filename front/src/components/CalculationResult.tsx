import type { FuelCalculateResponse } from '../types/fuelCalculate';

interface CalculationResultProps {
  data: FuelCalculateResponse;
  onRecalculate: () => void;
}

// Função para formatar a duração de segundos para "X min"
const formatDuration = (seconds: number): string => {
  const horas = Math.floor(seconds / 3600);
  const minutos = Math.floor((seconds % 3600) / 60);
  const segs = seconds % 60;

  return `${String(horas).padStart(2, '0')}h ${String(minutos).padStart(2, '0')}min ${String(segs).padStart(2, '0')}seg`;
};

// Função para formatar valores monetários para o padrão brasileiro
const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export function CalculationResult({ 
  data, 
  onRecalculate,
}: CalculationResultProps) {
  const fuelTypes = Object.keys(data).filter(key => key !== 'distance') as (keyof Omit<FuelCalculateResponse, 'distance'>)[];

  return (
    <div className="flex flex-col w-full md:h-auto animate-fade-in">

      <div className="p-6 pt-0 md:pt-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Resumo da Viagem</h1>
          <p className="text-gray-600 text-sm">
            Distância total de <strong>{data.distance.value} km</strong> em aprox. <strong>{formatDuration(data.distance.duration)}</strong>.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {fuelTypes.map(fuel => {
            const fuelInfo = data[fuel];
            if (!fuelInfo) return null;

            return (
              <div key={fuel} className="bg-white/50 rounded-lg p-4 border border-gray-200">
                <h2 className="font-bold text-lg capitalize text-blue-800">{fuel}</h2>
                <div className="flex justify-between items-center mt-2 text-gray-700">
                  <span>Custo Total:</span>
                  <span className="font-semibold text-lg">{formatCurrency(fuelInfo.totalCost)}</span>
                </div>
                <div className="flex justify-between items-center mt-1 text-gray-600 text-sm">
                  <span>Consumo Estimado:</span>
                  <span>{fuelInfo.liters.toFixed(2)} litros</span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onRecalculate}
          className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-bold transition-all mt-6"
        >
          Calcular Outra Rota
        </button>
      </div>
    </div>
  );
}