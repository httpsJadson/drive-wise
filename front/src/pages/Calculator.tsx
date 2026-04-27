import { useState, useRef, useEffect } from 'react';
import { Header } from '../components/Header';
import { MapContainer } from '../components/MapContainer';
import { CalculatorForm } from '../components/CalculatorForm';
import { useFuelCalculate } from '../hooks/useFuelCalculate';
import { CalculationResult } from '../components/CalculationResult';
import type { FuelCalculateResponse } from '../types/fuelCalculate';

export function Calculator() {
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const startY = useRef(0);
  const currentTranslateY = useRef(0); 
  const sheetHeight = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const { calculate, isLoading, error, data: calculationResult, setData: setCalculationResult } = useFuelCalculate();

  // Define os pontos de ancoragem para o painel
  const getAnchors = () => {
    const sheetH = sheetHeight.current;
    // const responsiveCollapsedHeight = window.innerHeight * 0.30; // 30% da tela
    return {
      full: sheetH * 0.45, // Totalmente visível
      half: sheetH * 0.45, // Metade visível
      collapsed: sheetH * 0.45, // Apenas a "drag bar" visível
    };
  };

  // Efeito para inicializar e atualizar a altura do painel
  useEffect(() => {
    const updateSheetHeight = () => {
      if (sheetRef.current) {
        sheetHeight.current = sheetRef.current.offsetHeight;
        if (window.innerWidth < 768) { // Apenas em mobile
          const anchors = getAnchors();
          setTranslateY(anchors.collapsed);
        }
      }
    };

    updateSheetHeight();

    // Recalcula a altura se o conteúdo mudar (formulário -> resultado)
    // Um pequeno delay ajuda a garantir que o DOM foi atualizado
    const timeoutId = setTimeout(updateSheetHeight, 100);

    return () => clearTimeout(timeoutId);
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
    const target = e.target as HTMLElement;
    if (!target.closest("#drag-bar")) return;

    startY.current = e.touches[0].clientY;
    currentTranslateY.current = translateY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    if (e.cancelable) {
      e.preventDefault(); // Opcional, dependendo da versão do React
    }

    const touchY = e.touches[0].clientY;
    const deltaY = touchY - startY.current;
    const newTranslate = currentTranslateY.current + deltaY;

    const anchors = getAnchors();
    // Permite arrastar apenas dentro dos limites (totalmente aberto e recolhido)
    if (newTranslate >= anchors.full && newTranslate <= anchors.collapsed) {
      setTranslateY(newTranslate);
    }
  };

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

  // Alterna entre os estados com um clique na drag-bar
  // const handleToggle = () => {
  //   const anchors = getAnchors();
  //   if (Math.abs(translateY - anchors.collapsed) < 10) {
  //     setTranslateY(anchors.half);
  //   } else {
  //     setTranslateY(anchors.collapsed);
  //   }
  // };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />

      <main className="grow relative overflow-hidden">
        <MapContainer zoom={14} height="100%" mapUrl={mapUrl} />

        {/* Container do Painel Arrastável */}
        <div className="absolute inset-0 z-10 pointer-events-none flex justify-center md:justify-start md:pl-20 md:p-4 md:items-center">
          <div 
            ref={sheetRef}
            className={`pointer-events-auto w-full max-w-md absolute bottom-0 md:relative md:bottom-auto transform 
              overscroll-contain touch-none
              ${isDragging ? '' : 'transition-transform duration-300 ease-out'}
            `}
            style={{ 
              height: window.innerWidth < 768 ? '100%' : 'auto',
              transform: window.innerWidth < 768 ? `translateY(${translateY}px)` : undefined,
              // Usamos touchAction: 'none' apenas quando estamos arrastando para não quebrar o scroll interno do form
              touchAction: isDragging ? 'none' : 'pan-y'
            }}
          >
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
      </main>
    </div>
  );
}
