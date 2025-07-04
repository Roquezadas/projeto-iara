// src/store/trailsStore.ts
import { create } from 'zustand';
import { useLocationsStore } from './locationsStore';
import { useAchievementsStore } from './achievementsStore';

export interface Trail {
  id: string;
  name: string;
  description: string;
  locationIds: string[];
}

const availableTrails: Trail[] = [
  {
    id: 'trilha-centro-historico',
    name: 'Trilha do Centro Histórico',
    description: 'Uma caminhada pelos ícones da Belle Époque e do Ciclo da Borracha em Manaus.',
    locationIds: ['teatro-amazonas', 'palacio-rio-negro', 'mercado-adolpho-lisboa'],
  },
];

interface TrailsState {
  trails: Trail[];
  activeTrail: Trail | null;
  currentStep: number;
  startTrail: (trailId: string) => void;
  advanceStep: () => void;
  endTrail: () => void;
}

export const useTrailsStore = create<TrailsState>((set, get) => ({
  trails: availableTrails,
  activeTrail: null,
  currentStep: 0,

  startTrail: (trailId) => {
    const trail = get().trails.find(t => t.id === trailId);
    if (trail) {
      const firstLocationId = trail.locationIds[0];
      const firstLocation = useLocationsStore.getState().locations.find(l => l.id === firstLocationId);
      if (firstLocation) {
        useLocationsStore.getState().setActiveLocation(firstLocation);
      }
      set({ activeTrail: trail, currentStep: 0 });
    }
  },

  advanceStep: () => {
    const { activeTrail, currentStep } = get();
    if (activeTrail && currentStep < activeTrail.locationIds.length - 1) {
      const nextStep = currentStep + 1;
      const nextLocationId = activeTrail.locationIds[nextStep];
      const nextLocation = useLocationsStore.getState().locations.find(l => l.id === nextLocationId);
      if (nextLocation) {
        useLocationsStore.getState().setActiveLocation(nextLocation);
      }
      set({ currentStep: nextStep });
    } else {
      if (activeTrail?.id === 'trilha-centro-historico') {
        useAchievementsStore.getState().unlockAchievement('centro-historico-completo');
      }
      get().endTrail();
    }
  },

  endTrail: () => {
    useLocationsStore.getState().setActiveLocation(null);
    set({ activeTrail: null, currentStep: 0 });
  },
}));