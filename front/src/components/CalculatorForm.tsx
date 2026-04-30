import { useState } from 'react';
import { VehicleSelect } from './VehicleSelect';

interface CalculatorFormProps {
  onSubmit?: (data: any) => void;
  isLoading?: boolean;
  error?: string | null;
}

export function CalculatorForm({ 
  onSubmit, 
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
    <div className="flex flex-col w-full h-full md:h-auto">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
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