// src/components/organisms/LocationList.tsx
import { useLocationsStore } from '../../store/locationsStore';
import { Landmark, ShoppingCart, Trees, Camera, X } from 'lucide-react';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

const typeIcons: { [key: string]: React.ReactNode } = {
  monument: <Landmark size={20} />,
  market: <ShoppingCart size={20} />,
  park: <Trees size={20} />,
};

export const LocationList = () => {
  const { locations, activeLocation, setActiveLocation, toggleLocationList } = useLocationsStore();

  return (
    <div className="h-full bg-slate-900/80 p-4 backdrop-blur-md overflow-y-auto relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Explorar Manaus</h2>
        {/* Botão de fechar para mobile */}
        <button onClick={toggleLocationList} className="md:hidden p-2 text-white/70 hover:text-white">
          <X />
        </button>
      </div>

      <div className="space-y-2">
        {locations.map(location => (
          <div key={location.id}>
            <button
              onClick={() => setActiveLocation(location)}
              className={clsx(
                "w-full p-3 rounded-lg text-left transition-colors flex items-center gap-4",
                activeLocation?.id === location.id
                  ? 'bg-blue-500/30'
                  : 'hover:bg-slate-700/50'
              )}
            >
              <div className="text-blue-300">
                {typeIcons[location.type]}
              </div>
              <div>
                <h3 className="font-bold text-white">{location.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{location.story}</p>
              </div>
            </button>
            
            {/* Botão de AR: Aparece apenas para o Teatro Amazonas */}
            {location.id === 'teatro-amazonas' && (
              <Link 
                to={`/ar/${location.id}`} 
                className="w-full mt-1 p-2 flex items-center justify-center gap-2 text-sm bg-purple-500/80 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Camera size={16} />
                Entrar em Modo AR
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};