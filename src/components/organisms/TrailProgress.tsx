// src/components/organisms/TrailProgress.tsx
import { useTrailsStore } from '../../store/trailsStore';
import { useLocationsStore } from '../../store/locationsStore';
import { MapPin, ArrowRight, X } from 'lucide-react';

export const TrailProgress = () => {
  const { activeTrail, currentStep, advanceStep, endTrail } = useTrailsStore();
  const locations = useLocationsStore(state => state.locations);

  if (!activeTrail) return null;

  const currentTargetId = activeTrail.locationIds[currentStep];
  const currentTargetLocation = locations.find(l => l.id === currentTargetId);

  return (
    <div className="absolute bottom-20 md:bottom-auto md:top-4 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-sm p-4 rounded-xl bg-slate-800/80 backdrop-blur-md shadow-lg text-white">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs uppercase text-blue-400 font-bold">Trilha Ativa</p>
          <h3 className="text-lg font-bold">{activeTrail.name}</h3>
        </div>
        <button onClick={endTrail} className="p-2 -mr-2 text-slate-400 hover:text-white"><X size={20} /></button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm">Próxima Parada ({currentStep + 1}/{activeTrail.locationIds.length}):</p>
        <p className="font-bold text-lg">{currentTargetLocation?.name}</p>
        <button 
          onClick={advanceStep} // Chamada simplificada
          className="w-full mt-3 flex items-center justify-center gap-2 p-2 text-sm rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition-colors"
        >
          {currentStep < activeTrail.locationIds.length - 1 ? 'Cheguei! Próximo local' : 'Concluir Trilha!'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};