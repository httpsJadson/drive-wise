import { useState, useRef, useEffect } from 'react';
import { Header } from '../components/Header';
import { MapContainer } from '../components/MapContainer';
import { CalculatorForm } from '../components/CalculatorForm';
import { useFuelCalculate } from '../hooks/useFuelCalculate';

const COLLAPSED_HEIGHT = -230; 

export function Calculator() {
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const startY = useRef(0);
  const currentTranslateY = useRef(0); 
  const sheetHeight = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const { calculate, isLoading, error, data: calculationResult } = useFuelCalculate();

  const getAnchors = () => {
    const h = sheetHeight.current;
    return {
      full: 0,                           
      half: h * 0.77,                       
      collapsed: h - COLLAPSED_HEIGHT    
    };
  };

  useEffect(() => {
    if (sheetRef.current) {
      sheetHeight.current = sheetRef.current.offsetHeight;
      if (window.innerWidth < 768) {
        setTranslateY(sheetHeight.current - COLLAPSED_HEIGHT);
      }
    }
  }, []);

  const handleCalculateRoute = async (data: { origem: string, destino: string, selectedVehicleId: number | null }) => {
    // Gera a URL do mapa para o iframe
    if (data.origem && data.destino) {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const url = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${encodeURIComponent(data.origem)}&destination=${encodeURIComponent(data.destino)}`;
      setMapUrl(url);
    }

    // Faz a chamada para a API de cálculo de combustível
    if (data.origem && data.destino && data.selectedVehicleId !== null) {
      await calculate({
        from: data.origem,
        to: data.destino,
        vehicle: data.selectedVehicleId
      });
    } else {
      console.warn("Dados insuficientes para calcular o custo da rota. Verifique se todos os campos foram preenchidos.");
    }
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
    
    const touchY = e.touches[0].clientY;
    const deltaY = touchY - startY.current;
    const newTranslate = currentTranslateY.current + deltaY;

    const anchors = getAnchors();
    if (newTranslate >= anchors.full && newTranslate <= anchors.collapsed) {
      setTranslateY(newTranslate);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const anchors = getAnchors();

    const distances = [
      { point: anchors.full, dist: Math.abs(translateY - anchors.full) },
      { point: anchors.half, dist: Math.abs(translateY - anchors.half) },
      { point: anchors.collapsed, dist: Math.abs(translateY - anchors.collapsed) }
    ];

    distances.sort((a, b) => a.dist - b.dist);
    setTranslateY(distances[0].point);
  };

  const handleToggle = () => {
    const anchors = getAnchors();
    
    if (translateY >= anchors.collapsed - 10) { 
      setTranslateY(anchors.half);
    } else if (translateY >= anchors.half - 10) {
      setTranslateY(anchors.full);
    } else {
      setTranslateY(anchors.collapsed);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />

      <main className="grow relative overflow-hidden">
        <MapContainer zoom={14} height="100%" mapUrl={mapUrl}/>

        <div className="absolute inset-0 z-10 pointer-events-none flex justify-center md:justify-start md:pl-20 md:p-4 md:items-center">
          <div 
            ref={sheetRef}
            className={`pointer-events-auto w-full max-w-md absolute bottom-0 md:relative md:bottom-auto transform
              ${isDragging ? '' : 'transition-transform duration-300 ease-out'}
            `}
            style={{ 
              height: window.innerWidth < 768 ? '100%' : 'auto',
              transform: window.innerWidth < 768 ? `translateY(${translateY}px)` : undefined 
            }}
          >
            <CalculatorForm 
              onSubmit={handleCalculateRoute}
              onToggle={handleToggle}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          </div>
        </div>
      </main>
    </div>
  );
}