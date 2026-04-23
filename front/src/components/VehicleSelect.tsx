import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import type {Vehicle}  from '../types/vehicles';
import { VehiclesService } from '../services/vehicles.api';

interface VehicleSelectProps {
  onSelect: (vehicle: Vehicle) => void;
}

export function VehicleSelect({ onSelect }: VehicleSelectProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Vehicle[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isSelectingRef = useRef(false);

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function fetchVehicles() {

      if (isSelectingRef.current) {
        isSelectingRef.current = false;
        return;
      }

      if (debouncedSearch.length < 2) {
        setResults([]);
        setIsDropdownOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const vehicles = await VehiclesService.search(debouncedSearch);
        setResults(vehicles);
        setIsDropdownOpen(true);
      } catch (error) {
        console.error('Erro ao buscar veículos na API real', error);
        setResults([]);
        setIsDropdownOpen(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVehicles();
  }, [debouncedSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectVehicle = (vehicle: Vehicle) => {
    isSelectingRef.current = true; // Levanta a bandeira antes de mudar o texto
    setSearchTerm(vehicle.fullName);
    setSelectedVehicleId(vehicle.id);
    setIsDropdownOpen(false);
    onSelect(vehicle); 
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Veículo
      </label>
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Digite o modelo do carro (ex: Toyota Corolla Cross)"
        value={searchTerm}
        id={selectedVehicleId?.toString()} // O ID fica invisível aqui no HTML, mas atrelado ao input
        onChange={(e) => {
          setSearchTerm(e.target.value);
          // Se o usuário apagar o texto, limpa o ID do veículo selecionado anteriormente
          onSelect({ id: 0, fullName: e.target.value } as any);
        }}
        onFocus={() => {
          if (results.length > 0) setIsDropdownOpen(true);
        }}
      />
      
      {isLoading && <p className="text-xs text-gray-500 mt-1 absolute">Buscando...</p>}

      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {results.length > 0 ? (
            <ul>
              {results.map((vehicle) => (
                <li
                  key={vehicle.id}
                  className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                  onClick={() => handleSelectVehicle(vehicle)}
                > 
                  {vehicle.fullName}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-3 text-sm text-gray-500">
              Nenhum veículo encontrado.
            </div>
          )}
        </div>
      )}
    </div>
  );
}