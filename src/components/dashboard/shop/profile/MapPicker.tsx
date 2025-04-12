import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { LoadScriptProps } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

// Mueve las librerías a una constante fuera del componente
const LIBRARIES: LoadScriptProps['libraries'] = ['places'];

const containerStyle = {
  width: '100%',
  height: '400px'
};

interface MapPickerProps {
  selectedLocation: { lat: number; lng: number } | null;
  onLocationChange: (location: { lat: number; lng: number }) => void;
}

export function MapPicker({ selectedLocation, onLocationChange }: MapPickerProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDeoVVbdx_x9togkzyO1gsw1RJwek4dzDY",
    libraries: LIBRARIES // Usa la constante definida fuera del componente
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (map && selectedLocation) {
      map.panTo(selectedLocation);
    }
  }, [selectedLocation, map]);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      onLocationChange({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
    }
  };

  if (loadError) {
    return <div className="h-full w-full flex items-center justify-center">Error al cargar el mapa</div>;
  }

  if (!isLoaded) {
    return <div className="h-full w-full flex items-center justify-center">Cargando mapa...</div>;
  }

  // Si no hay ubicación seleccionada, no renderizar el mapa
  if (!selectedLocation) {
    return <div className="h-full w-full flex items-center justify-center">Seleccione una ubicación</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={selectedLocation}
      zoom={15}
      onClick={handleMapClick}
      onLoad={(map) => setMap(map)}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false
      }}
    >
      <Marker 
        position={selectedLocation}
        draggable={true}
        onDragEnd={(e) => {
          if (e.latLng) {
            onLocationChange({
              lat: e.latLng.lat(),
              lng: e.latLng.lng()
            });
          }
        }}
      />
    </GoogleMap>
  );
}