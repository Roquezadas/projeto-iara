// src/store/locationsStore.ts
import { create } from 'zustand';

export interface Location {
  id: string;
  name: string;
  position: [number, number];
  story: string;
  type: 'monument' | 'park' | 'market';
  image: string;
}

const historicLocations: Location[] = [
  {
    id: 'teatro-amazonas',
    name: 'Teatro Amazonas',
    position: [-3.1303, -60.0241],
    story: 'Inaugurado em 1896, no auge do Ciclo da Borracha, é o principal símbolo cultural e arquitetônico de Manaus.',
    type: 'monument',
    image: '/images/locations/teatro-amazonas.jpg',
  },
  {
    id: 'mercado-adolpho-lisboa',
    name: 'Mercado Adolpho Lisboa',
    position: [-3.1405, -60.0230],
    story: 'Sua estrutura de ferro foi projetada por Gustave Eiffel. É um vibrante centro de comércio de produtos regionais.',
    type: 'market',
    image: '/images/locations/mercado-lisboa.jpg',
  },
  {
    id: 'palacio-rio-negro',
    name: 'Palácio Rio Negro',
    position: [-3.1330, -60.0205],
    story: 'Construído para ser a residência de um barão da borracha, tornou-se a sede do governo do Amazonas.',
    type: 'monument',
    image: '/images/locations/palacio-rio-negro.jpg',
  },
  {
    id: 'encontro-das-aguas',
    name: 'Encontro das Águas',
    position: [-3.1095, -59.9135],
    story: 'Fenômeno natural onde as águas escuras do Rio Negro e as barrentas do Rio Solimões correm lado a lado sem se misturar.',
    type: 'park',
    image: '/images/locations/encontro-das-aguas.jpg',
  },
];

// Definimos os nossos temas de mapa
export const mapThemes = {
  dark: {
    name: 'Escuro',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  satellite: {
    name: 'Satélite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
  artistic: {
    name: 'Artístico',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }
};

interface LocationsState {
  locations: Location[];
  activeLocation: Location | null;
  isLocationListOpen: boolean;
  activeMapTheme: keyof typeof mapThemes;
  setActiveLocation: (location: Location | null) => void;
  toggleLocationList: () => void;
  cycleMapTheme: () => void;
}

export const useLocationsStore = create<LocationsState>((set, get) => ({
  locations: historicLocations,
  activeLocation: null,
  isLocationListOpen: true,
  activeMapTheme: 'dark', // Tema padrão
  setActiveLocation: (location) => set({ activeLocation: location }),
  toggleLocationList: () => set((state) => ({ isLocationListOpen: !state.isLocationListOpen })),
  
  // Ação para alternar entre os temas
  cycleMapTheme: () => {
    const themeKeys = Object.keys(mapThemes) as (keyof typeof mapThemes)[];
    const currentThemeIndex = themeKeys.indexOf(get().activeMapTheme);
    const nextThemeIndex = (currentThemeIndex + 1) % themeKeys.length;
    set({ activeMapTheme: themeKeys[nextThemeIndex] });
  },
}));