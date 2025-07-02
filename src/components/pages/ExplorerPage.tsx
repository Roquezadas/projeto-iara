// src/components/pages/ExplorerPage.tsx
import { Map } from '../organisms/Map';
import { LocationList } from '../organisms/LocationList';
import { MenuButton } from '../atoms/MenuButton';
import { useLocationsStore } from '../../store/locationsStore';
import { clsx } from 'clsx';

export const ExplorerPage = () => {
  const { isLocationListOpen } = useLocationsStore();

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-slate-900">
      {/* Barra Lateral que desliza */}
      <div className={clsx(
        "absolute top-0 left-0 h-full w-full max-w-sm z-[1001] transition-transform duration-300 ease-in-out",
        isLocationListOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <LocationList />
      </div>

      {/* Mapa */}
      <div className="w-full h-full">
        <Map />
      </div>

      {/* Botão de Menu para o Mobile (e telas pequenas) */}
      <div className="md:hidden">
        <MenuButton />
      </div>
    </div>
  );
};