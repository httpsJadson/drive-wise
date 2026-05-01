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
      collapsed: windowH * 0.80
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
    <div className="h-screen flex flex-col overflow-hidden" >
      <Header />
      
      <main className="grow relative overflow-hidden" style={{ overscrollBehaviorY: 'contain' }}>
        {/* Container Pai: Ocupa a tela toda, mas não bloqueia o mapa */}
        <div className="absolute inset-0 z-99 pointer-events-none flex justify-center md:justify-start md:pl-20 md:p-4">
          <div 
            ref={sheetRef}
            className={`w-full max-w-md absolute top-0 
              ${isDragging ? '' : 'transition-transform duration-300 ease-out'}
              pointer-events-none 
            `}
            style={{ 
              height: '100vh', 
              touchAction: 'none', 
              transform: window.innerWidth > 768 ? `translateY(30%)` : `translateY(${translateY}px)`,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* ÁREA VISUAL BRANCA: Aqui reativamos o toque */}
            <div className={`pointer-events-auto w-full h-full ${window.innerWidth > 768 ? 'md:h-auto rounded-2xl' : 'h-full'}  bg-white/80 backdrop-blur-lg rounded-t-2xl shadow-2xl flex flex-col overflow-hidden`}>
              
              {/* Barra de arraste */}
              <div className="flex md:hidden w-full h-14 items-center justify-center shrink-0 cursor-grab">
                <div className="w-12 h-1.5 bg-gray-400 rounded-full" />
              </div>

              <div className="flex-1 overflow-y-auto pt-0 px-8 md:py-8 pb-20 ">
                {calculationResult ? (
                  <CalculationResult data={calculationResult as FuelCalculateResponse} onRecalculate={handleRecalculate} />
                ) : (
                  <CalculatorForm onSubmit={handleCalculateRoute} isLoading={isLoading} error={error} />
                )}
              </div>
            </div>
          </div>
        </div>
        
        <MapContainer zoom={14} height={window.innerWidth > 768 ? '100%' : '90%'} mapUrl={mapUrl} />
      </main>
    </div>
  );
}