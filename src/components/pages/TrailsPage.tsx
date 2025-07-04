// src/components/pages/TrailsPage.tsx
import { useTrailsStore } from '../../store/trailsStore';
import { useNavigate } from 'react-router-dom';
import { Footprints, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocationsStore } from '../../store/locationsStore';

export const TrailsPage = () => {
  const { trails, startTrail, activeTrail } = useTrailsStore();
  const { locations } = useLocationsStore();
  const navigate = useNavigate();

  const handleStartTrail = (trailId: string) => {
    startTrail(trailId);
    navigate('/explore'); // Leva o usuário para o mapa ao iniciar a trilha
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Footprints size={32} className="text-blue-400"/>
        <div>
          <h1 className="text-3xl font-bold text-white">Trilhas do Conhecimento</h1>
          <p className="text-slate-400">Siga roteiros históricos e culturais por Manaus.</p>
        </div>
      </div>

      <div className="space-y-6">
        {trails.map((trail, index) => {
          const trailLocations = trail.locationIds.map(id => locations.find(l => l.id === id)?.name).filter(Boolean);

          return (
            <motion.div
              key={trail.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-black/20 backdrop-filter backdrop-blur-md border border-white/10"
            >
              <h2 className="font-bold text-xl text-white">{trail.name}</h2>
              <p className="text-slate-300 mt-1 mb-4">{trail.description}</p>
              
              <div className="border-l-2 border-dashed border-slate-600 pl-4 space-y-2 mb-4">
                {trailLocations.map((name, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin size={14} />
                    <span>{name}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleStartTrail(trail.id)}
                disabled={activeTrail?.id === trail.id}
                className="flex items-center justify-center gap-2 w-full p-3 text-sm rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
              >
                <Footprints size={16} />
                {activeTrail?.id === trail.id ? 'Trilha em Andamento' : 'Iniciar Trilha'}
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
};