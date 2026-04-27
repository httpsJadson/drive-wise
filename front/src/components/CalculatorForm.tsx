import { useState } from 'react';
import { VehicleSelect } from './VehicleSelect';

interface CalculatorFormProps {
  onSubmit?: (data: any) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export function CalculatorForm({ 
  onSubmit, 
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  isLoading = false,
  error = null
}: CalculatorFormProps) {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ origem, destino, selectedVehicleId });
    }
  };

  return (
    <div 
      className="flex flex-col w-full bg-white/75 backdrop-blur-lg h-full md:h-auto rounded-lg shadow-lg overflow-hidden"
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

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 md:p-8 pt-0 md:pt-8"
      >
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-gray-800">Para onde vamos?</h1>
          <p className="text-gray-600 text-sm">Calcule o custo da sua viagem em segundos.</p>
        </div>
        <input 
          type="text" 
          placeholder="Ponto de partida" 
          name='from'
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={origem}
          onChange={(e) => setOrigem(e.target.value)}
        />
        
        <input 
          type="text" 
          placeholder="Destino final" 
          name='to'
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />
        
        <VehicleSelect 
          onSelect={(vehicle) => setSelectedVehicleId(vehicle.id)} 
        />
        
        {error && (
          <p className="text-red-500 text-sm text-center mt-2 bg-red-100 border border-red-300 rounded-lg py-2 px-4">
            {error}
          </p>
        )}

        <button 
          type="submit"
          disabled={isLoading}
          className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-4 shadow-lg shadow-blue-200 disabled:bg-blue-400 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isLoading ? 'Calculando...' : 'Calcular Rota'}
        </button>
      </form>
    </div>
  );
}