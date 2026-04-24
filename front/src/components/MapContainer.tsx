import { useCallback, useState, memo } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

interface MapContainerProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
}

const defaultCenter = {
  lat: -23.55052,
  lng: -46.633308
};

// ´pegar a localização do usuário

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];

function MapContainerComponent({ 
  center = defaultCenter, 
  zoom = 14, 
  height = '400px' 
}: MapContainerProps) {
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return (
      <div 
        style={{ height }} 
        className="w-full flex items-center justify-center bg-gray-100 rounded-lg animate-pulse text-gray-500"
      >
        Carregando mapa...
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height }}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ disableDefaultUI: true, zoomControl: false }}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
}

export const MapContainer = memo(MapContainerComponent);