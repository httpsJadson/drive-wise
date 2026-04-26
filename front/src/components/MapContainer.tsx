import { useCallback, useState, memo, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

interface MapContainerProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  mapUrl?: string | null;
}

const FALLBACK_CENTER = {
  lat: -23.55052,
  lng: -46.633308
};

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];

function MapContainerComponent({ 
  center, 
  zoom = 14, 
  height = '400px', 
  mapUrl 
}: MapContainerProps) {
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState(center || FALLBACK_CENTER);

  useEffect(() => {
    if (center) {
      setMapCenter(center);
      if (map) map.panTo(center);
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setMapCenter(userLocation);
          if (map) {
            map.panTo(userLocation);
            map.setZoom(15);
          }
        },
        (error) => {
          console.warn("Usuário bloqueou o GPS ou falhou:", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, [center, map]);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (mapUrl) {
    return (
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    );
  }

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
        center={mapCenter}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ disableDefaultUI: true, zoomControl: false }}
      >
        <MarkerF position={mapCenter} />
      </GoogleMap>
    </div>
  );
}

export const MapContainer = memo(MapContainerComponent);