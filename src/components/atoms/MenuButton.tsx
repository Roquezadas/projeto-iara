// src/components/atoms/MenuButton.tsx
import { Menu, X } from 'lucide-react';
import { useLocationsStore } from '../../store/locationsStore';

export const MenuButton = () => {
  const { isLocationListOpen, toggleLocationList } = useLocationsStore();
  return (
    <button 
      onClick={toggleLocationList} 
      className="absolute top-4 left-4 z-[1000] p-3 bg-slate-800/80 text-white rounded-full backdrop-blur-sm hover:bg-slate-700"
      aria-label="Toggle location list"
    >
      {isLocationListOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
};