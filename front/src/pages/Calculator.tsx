import { useState, useRef, useEffect } from 'react';
import { MapContainer } from '../components/MapContainer';
import { Header } from '../components/Header';
import { CalculatorForm } from '../components/CalculatorForm';

const COLLAPSED_HEIGHT = 140; 

export function Calculator() {

  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const startY = useRef(0);
  const currentTranslateY = useRef(0); 
  const sheetHeight = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const getAnchors = () => {
    const h = sheetHeight.current;
    return {
      full: 0,                           
      half: h * 0.4,                       
      collapsed: h - COLLAPSED_HEIGHT    
    };
  };

  useEffect(() => {
    if (containerRef.current) {
      sheetHeight.current = containerRef.current.offsetHeight;
      if (window.innerWidth < 768) {
        setTranslateY(sheetHeight.current - COLLAPSED_HEIGHT);
      }
    }
  }, []);

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

      <main ref={containerRef} className="grow relative overflow-hidden">
        {/* Mapa como fundo da Hero Section */}
        <MapContainer zoom={14} height="100%" />

        {/* Overlay do Formulário */}
        {/* Adicionamos md:items-center para centralizar verticalmente no PC */}
        <div className="absolute inset-0 z-10 pointer-events-none flex justify-center md:justify-start md:pl-20 md:p-4 md:items-center">
          <div 
            className={`pointer-events-auto w-full max-w-md absolute bottom-0 md:relative md:bottom-auto transform
              ${isDragging ? '' : 'transition-transform duration-300 ease-out'}
            `}
            style={{ 
              // No mobile a altura é 100% para a gaveta. No PC, a altura se ajusta ao conteúdo ('auto')
              height: window.innerWidth < 768 ? '100%' : 'auto',
              // Só aplica o translateY do arraste se for mobile
              transform: window.innerWidth < 768 ? `translateY(${translateY}px)` : undefined 
            }}
          >
            <CalculatorForm 
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