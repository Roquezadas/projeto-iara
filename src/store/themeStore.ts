// src/store/themeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeName = 'encontro_rios' | 'floresta' | 'por_do_sol';

interface Theme {
  name: ThemeName;
  background: string;
  primary: string;
  text: string;
}

export const themes: Record<ThemeName, Theme> = {
  encontro_rios: {
    name: 'encontro_rios',
    background: 'from-gray-900 to-amber-900/70',
    primary: 'text-amber-300',
    text: 'text-white',
  },
  floresta: {
    name: 'floresta',
    background: 'from-green-900 via-teal-900 to-gray-900',
    primary: 'text-emerald-400',
    text: 'text-white',
  },
  por_do_sol: {
    name: 'por_do_sol',
    background: 'from-orange-700 via-purple-900 to-black',
    primary: 'text-orange-300',
    text: 'text-white',
  },
};

interface ThemeState {
  activeTheme: Theme;
  setTheme: (themeName: ThemeName) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      activeTheme: themes.encontro_rios, // Tema Padrão
      setTheme: (themeName) => set({ activeTheme: themes[themeName] }),
    }),
    {
      name: 'iara-theme-storage', // Chave para salvar no localStorage
    }
  )
);