// src/components/organisms/Map.tsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLocationsStore, mapThemes } from '../../store/locationsStore';
import { useTrailsStore } from '../../store/trailsStore';
import { renderToStaticMarkup } from 'react-dom/server';
import { Landmark, ShoppingCart, Trees, Layers, Camera } from 'lucide-react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

// Função para criar ícones SVG customizados
const createDivIcon = (iconComponent: React.ReactNode, options: { isActive?: boolean } = {}) => {
  const iconMarkup = renderToStaticMarkup(iconComponent);
  const classes = clsx(
    "p-2 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center",
    options.isActive 
      ? 'bg-blue-500 text-white scale-125 ring-4 ring-white/50' 
      : 'bg-slate-800/80 text-white/80 backdrop-blur-md'
  );

  return L.divIcon({
    html: `<div class="${classes}">${iconMarkup}</div>`,
    className: 'bg-transparent border-0',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });
};

const locationIcons = {
  monument: createDivIcon(<Landmark size={18} />),
  market: createDivIcon(<ShoppingCart size={18} />),
  park: createDivIcon(<Trees size={18} />),
};

const activeLocationIcons = {
  monument: createDivIcon(<Landmark size={18} />, { isActive: true }),
  market: createDivIcon(<ShoppingCart size={18} />, { isActive: true }),
  park: createDivIcon(<Trees size={18} />, { isActive: true }),
};

// Componente para o botão de troca de tema
const MapThemeSwitcher = () => {
  const { activeMapTheme, cycleMapTheme } = useLocationsStore();
  return (
    <button
      onClick={cycleMapTheme}
      className="absolute top-4 right-4 z-[1000] p-3 bg-slate-800/80 text-white rounded-full backdrop-blur-sm hover:bg-slate-700"
      title={`Mudar tema do mapa (Atual: ${mapThemes[activeMapTheme].name})`}
    >
      <Layers size={20} />
    </button>
  );
};

// Componente interno para controlar o mapa (zoom e pan)
const MapController = () => {
  const map = useMap();
  const { activeLocation } = useLocationsStore();

  useEffect(() => {
    if (activeLocation) {
      map.flyTo(activeLocation.position, 16, {
        animate: true,
        duration: 1.5
      });
    }
  }, [activeLocation, map]);

  return null;
};

export const Map = () => {
  const { locations, activeLocation, setActiveLocation, activeMapTheme } = useLocationsStore();
  const { activeTrail } = useTrailsStore();
  const navigate = useNavigate();
  const theme = mapThemes[activeMapTheme];
  const initialPosition: [number, number] = [-3.1303, -60.0241];

  const trailPositions = activeTrail
    ? activeTrail.locationIds
        .map(id => locations.find(l => l.id === id)?.position)
        .filter((pos): pos is [number, number] => pos !== undefined)
    : [];

  return (
    <div className="w-full h-full relative">
      <MapContainer center={initialPosition} zoom={14} scrollWheelZoom={true} className="w-full h-full">
        <TileLayer attribution={theme.attribution} url={theme.url} key={activeMapTheme} />
        
        {activeTrail && <Polyline pathOptions={{ color: 'cyan', weight: 5, opacity: 0.7 }} positions={trailPositions} />}

        {locations.map(location => {
          const isActive = activeLocation?.id === location.id;
          const icon = isActive ? activeLocationIcons[location.type] : locationIcons[location.type];

          return (
            <Marker 
              key={location.id} 
              position={location.position}
              icon={icon}
              eventHandlers={{ click: () => { setActiveLocation(location); } }}
            >
              <Popup closeButton={true} className="custom-popup">
                <div className="font-sans w-64">
                  <h3 className="font-bold text-base m-0 mb-1 text-white">{location.name}</h3>
                  <p className="text-sm m-0 text-slate-300">{location.story}</p>

                  {location.id === 'teatro-amazonas' && (
                    <button 
                      onClick={() => navigate(`/ar/${location.id}`)}
                      className="w-full mt-3 p-2 flex items-center justify-center gap-2 text-sm bg-purple-500/80 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      <Camera size={16} />
                      Ver em Realidade Aumentada
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
        
        <MapController />
      </MapContainer>
      <MapThemeSwitcher />
    </div>
  );
};