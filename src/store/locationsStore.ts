// src/store/locationsStore.ts
import { create } from 'zustand';

export interface Location {
  id: string;
  name: string;
  position: [number, number];
  story: string;
  type: 'monument' | 'park' | 'market';
}

const historicLocations: Location[] = [
  {
    id: 'teatro-amazonas',
    name: 'Teatro Amazonas',
    position: [-3.1303, -60.0241],
    story: 'Inaugurado em 1896, no auge do Ciclo da Borracha, é o principal símbolo cultural e arquitetônico de Manaus.',
    type: 'monument',
  },
  {
    id: 'mercado-adolpho-lisboa',
    name: 'Mercado Adolpho Lisboa',
    position: [-3.1405, -60.0230],
    story: 'Sua estrutura de ferro foi projetada por Gustave Eiffel e trazida da Europa. É um vibrante centro de comércio regional.',
    type: 'market',
  },
  {
    id: 'palacio-rio-negro',
    name: 'Palácio Rio Negro',
    position: [-3.1330, -60.0205],
    story: 'Construído para ser a residência de um barão da borracha, tornou-se a sede do governo do Amazonas.',
    type: 'monument',
  },
  {
    id: 'encontro-das-aguas',
    name: 'Encontro das Águas',
    position: [-3.1095, -59.9135],
    story: 'Fenômeno natural onde as águas escuras do Rio Negro e as barrentas do Rio Solimões correm lado a lado sem se misturar.',
    type: 'park',
  },
];

interface LocationsState {
  locations: Location[];
  activeLocation: Location | null;
  isLocationListOpen: boolean; // <-- Adicione esta linha
  setActiveLocation: (location: Location | null) => void;
  toggleLocationList: () => void; // <-- Adicione esta linha
}

export const useLocationsStore = create<LocationsState>((set) => ({
  locations: historicLocations,
  activeLocation: null,
  isLocationListOpen: true, // <-- Adicione esta linha (começa aberto no desktop)
  setActiveLocation: (location) => set({ activeLocation: location }),
  toggleLocationList: () => set((state) => ({ isLocationListOpen: !state.isLocationListOpen })), // <-- Adicione esta linha
}));