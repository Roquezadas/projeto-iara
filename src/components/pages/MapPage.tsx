// src/components/pages/MapPage.tsx
import { Map } from '../organisms/Map';
import { LocationList } from '../organisms/LocationList';
import { TrailProgress } from '../organisms/TrailProgress';

export const MapPage = () => {
  return (
    // O 'relative' é importante para o posicionamento do TrailProgress
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-4 relative">
      
      <div className="hidden md:block md:col-span-1">
        <LocationList />
      </div>
      
      <div className="col-span-1 md:col-span-3">
        <Map />
      </div>

      {/* A interface da trilha aparece sobre o mapa */}
      <TrailProgress />
    </div>
  );
};