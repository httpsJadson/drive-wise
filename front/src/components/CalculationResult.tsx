import type { FuelCalculateResponse } from '../types/fuelCalculate';

interface CalculationResultProps {
  data: FuelCalculateResponse;
  onRecalculate: () => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: () => void;
}

// Função para formatar a duração de segundos para "X min"
const formatDuration = (seconds: number): string => {
  const minutes = Math.round(seconds / 60);
  return `${minutes} min`;
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
  onTouchStart,
  onTouchMove,
  onTouchEnd 
}: CalculationResultProps) {
  // Extrai os tipos de combustível disponíveis na resposta, exceto 'distance'
  const fuelTypes = Object.keys(data).filter(key => key !== 'distance') as (keyof Omit<FuelCalculateResponse, 'distance'>)[];

  return (
    <div 
      className="flex flex-col w-full bg-white/80 backdrop-blur-lg h-full md:h-auto rounded-lg shadow-lg overflow-auto animate-fade-in"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Barra de arraste visual - Apenas Mobile */}
      <div 
        className="md:hidden w-full flex justify-center py-4 cursor-grab active:cursor-grabbing" 
        id="drag-bar"
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
      </div>

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