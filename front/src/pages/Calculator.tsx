import { useState } from 'react';
import { VehicleSelect } from '../components/VehicleSelect';

export function Calculator() {
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form className="flex flex-col gap-4 p-8 rounded-lg bg-white shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Calculadora de Combustível</h1>
        
        <input 
          type="text" 
          placeholder="Origem" 
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input 
          type="text" 
          placeholder="Destino" 
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <VehicleSelect 
          onSelect={(vehicle) => setSelectedVehicleId(vehicle.id)} 
        />
        
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold cursor-pointer mt-4"
        >
          Calcular Gasto
        </button>
      </form>
    </div>
  );
}