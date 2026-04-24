import { useState } from 'react';
import { VehicleSelect } from './VehicleSelect';

interface CalculatorFormProps {
  onSubmit?: (data: any) => void;
  onToggle?: () => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: () => void;
}

export function CalculatorForm({ 
  onSubmit, 
  onToggle,
  onTouchStart,
  onTouchMove,
  onTouchEnd
}: CalculatorFormProps) {
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ selectedVehicleId });
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-white/90 backdrop-blur-lg rounded-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.1)] overflow-hidden">
      
      {/* Barra de arraste visual - Apenas Mobile */}
      <div 
        className="md:hidden w-full flex justify-center py-4 cursor-grab active:cursor-grabbing" 
        id="drag-bar"
        onClick={onToggle}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
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
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        
        <input 
          type="text" 
          placeholder="Destino final" 
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        
        <VehicleSelect 
          onSelect={(vehicle) => setSelectedVehicleId(vehicle.id)} 
        />
        
        <button 
          type="submit" 
          className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-4 shadow-lg shadow-blue-200"
        >
          Calcular Rota
        </button>
      </form>
    </div>
  );
}