// src/components/pages/LocationsPage.tsx
import { useState, useMemo } from 'react';
// A CORREÇÃO ESTÁ AQUI: importamos o 'type Location' junto com o hook
import { useLocationsStore, type Location } from '../../store/locationsStore';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { LocationCard } from '../molecules/LocationCard';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

export const LocationsPage = () => {
  const { locations } = useLocationsStore();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | Location['type']>('all');

  const filteredLocations = useMemo(() => {
    return locations
      .filter(location => {
        if (activeFilter === 'all') return true;
        // Agora o TypeScript sabe o que é location.type
        return location.type === activeFilter;
      })
      .filter(location => 
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [locations, searchTerm, activeFilter]);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-white mb-2">Catálogo de Locais</h1>
      <p className="text-slate-400 mb-6">Descubra os tesouros de Manaus.</p>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
          <input 
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex gap-2 p-1 rounded-lg bg-black/20 border border-white/10">
          {(['all', 'monument', 'market', 'park'] as const).map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={clsx("px-3 py-1 text-sm font-medium rounded-md transition-colors capitalize", activeFilter === filter ? 'bg-white text-slate-900' : 'text-slate-300 hover:bg-white/10')}
            >
              {filter === 'all' ? 'Todos' : filter}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {filteredLocations.map(location => (
          <motion.div 
            key={location.id} 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            onClick={() => navigate(`/location/${location.id}`)}
          >
            <LocationCard location={location} />
          </motion.div>
        ))}
      </motion.div>
      
      {filteredLocations.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-400">Nenhum local encontrado com estes filtros.</p>
        </div>
      )}

      {/* Não precisamos mais do Modal aqui */}
    </div>
  );
};