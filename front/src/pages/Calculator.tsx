import { useCallback, useEffect, useRef, useState } from 'react';
import { Header } from '../components/Header';
import { MapContainer } from '../components/MapContainer';
import { CalculatorForm } from '../components/CalculatorForm';
import { useFuelCalculate } from '../hooks/useFuelCalculate';
import { CalculationResult } from '../components/CalculationResult';
import type { FuelCalculateResponse } from '../types/fuelCalculate';

const formH = 570;

export function Calculator() {
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const startY = useRef(0);
  const currentTranslateY = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const { calculate, isLoading, error, data: calculationResult, setData: setCalculationResult } = useFuelCalculate();

  const getAnchors = useCallback(() => {
  const windowH = window.innerHeight;
  return {
    full: 0, 
    half: windowH - formH, 
    collapsed: windowH * 0.75
  };
}, [calculationResult]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const windowH = window.innerHeight;
      setTranslateY(windowH - formH); 
    }, 100);

    return () => clearTimeout(timer);
  }, [calculationResult]); 

  const handleCalculateRoute = async (data: { origem: string, destino: string, selectedVehicleId: number | null }) => {
    if (data.origem && data.destino) {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const url = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${encodeURIComponent(data.origem)}&destination=${encodeURIComponent(data.destino)}`;
      setMapUrl(url);
    }

    if (data.origem && data.destino && data.selectedVehicleId !== null) {
      await calculate({
        from: data.origem,
        to: data.destino,
        vehicle: data.selectedVehicleId
      });
    } else {
      console.warn("Dados insuficientes para calcular.");
    }
  };

  const handleRecalculate = () => {
    setCalculationResult(null);
    setMapUrl(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    

    startY.current = e.touches[0].clientY;
    currentTranslateY.current = translateY;
    setIsDragging(true);
  };

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    //e.preventDefault();

    const touchY = e.touches[0].clientY;
    const deltaY = touchY - startY.current;
    const newTranslate = currentTranslateY.current + deltaY;

    const anchors = getAnchors();
    const minTranslate = anchors.full;
    const maxTranslate = anchors.collapsed;

    if (newTranslate >= minTranslate && newTranslate <= maxTranslate) {
      setTranslateY(newTranslate);
    }
  }, [isDragging, getAnchors]);

  const handleTouchEnd = () => {
    setIsDragging(false);
    const anchors = getAnchors();

    // Encontra o ponto de ancoragem mais próximo
    const distances = [
      { point: anchors.full, dist: Math.abs(translateY - anchors.full) },
      { point: anchors.half, dist: Math.abs(translateY - anchors.half) },
      { point: anchors.collapsed, dist: Math.abs(translateY - anchors.collapsed) }
    ];

    distances.sort((a, b) => a.dist - b.dist);
    setTranslateY(distances[0].point); // Anima para o ponto mais próximo
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />

      <main className="grow relative overflow-hidden">
        <MapContainer zoom={14} height='80vh' mapUrl={mapUrl} />

        {/* Container Pai: agora com h-full para garantir que a área de toque exista em toda a tela */}
        <div className="absolute inset-0 z-99 pointer-events-none flex justify-center md:justify-start md:pl-20 md:p-4">
          <div 
            ref={sheetRef}
            className={`pointer-events-auto w-full max-w-md absolute top-0 ...`}
            style={{ 
              height: '100%', // Altura do papel (sheet)
              touchAction: 'none', 
              transform: `translateY(${translateY}px)`,
              zIndex: 100
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Esta div interna é o seu painel real. 
              Como o pai é top-0 e 100vh, o translateY agora move a estrutura toda
              de forma muito mais estável para o navegador.
            */}
            <div className="w-full h-full bg-white/80 backdrop-blur-lg rounded-t-2xl shadow-2xl overflow-hidden">
              {calculationResult ? (
                <CalculationResult 
                  data={calculationResult as FuelCalculateResponse} 
                  onRecalculate={handleRecalculate}   
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}  
                  onTouchEnd={handleTouchEnd}
                />
              ) : (
                <CalculatorForm 
                  onSubmit={handleCalculateRoute}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  isLoading={isLoading}
                  error={error}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}