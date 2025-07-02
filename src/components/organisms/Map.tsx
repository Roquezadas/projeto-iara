// src/components/organisms/Map.tsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLocationsStore } from '../../store/locationsStore';
import { useEffect } from 'react';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import iconActiveUrl from 'leaflet/dist/images/marker-icon-2x.png';

const DefaultIcon = L.icon({ iconUrl, shadowUrl, iconSize: [25, 41], iconAnchor: [12, 41] });
const ActiveIcon = L.icon({ iconUrl: iconActiveUrl, shadowUrl, iconSize: [50, 82], iconAnchor: [25, 82] });

L.Marker.prototype.options.icon = DefaultIcon;

const MapController = () => {
  const map = useMap();
  const { activeLocation } = useLocationsStore();

  useEffect(() => {
    if (activeLocation) {
      map.flyTo(activeLocation.position, 16, { animate: true, duration: 1.5 });
    }
  }, [activeLocation, map]);

  return null;
};

export const Map = () => {
  const { locations, activeLocation, setActiveLocation } = useLocationsStore();
  const initialPosition: [number, number] = [-3.1303, -60.0241];

  return (
    <MapContainer center={initialPosition} zoom={14} scrollWheelZoom={true} className="w-full h-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      
      {locations.map(location => (
        <Marker 
          key={location.id} 
          position={location.position}
          icon={activeLocation?.id === location.id ? ActiveIcon : DefaultIcon}
          eventHandlers={{ click: () => { setActiveLocation(location); } }}
        >
          <Popup>
            <div className="font-sans">
              <h3 className="font-bold text-lg m-0 mb-1">{location.name}</h3>
              <p className="text-base m-0">{location.story}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      
      <MapController />
    </MapContainer>
  );
};