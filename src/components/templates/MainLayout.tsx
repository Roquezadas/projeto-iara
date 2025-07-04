// src/components/templates/MainLayout.tsx
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Map as MapIcon, List, Footprints, User } from 'lucide-react';
import { clsx } from 'clsx';
import { useThemeStore, themes, type Theme } from '../../store/themeStore';

const NavItem: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    clsx(
      "flex items-center justify-center md:justify-start gap-3 md:px-3 md:py-2 rounded-md text-sm font-medium transition-colors w-full h-full",
      "flex-col md:flex-row text-xs",
      isActive 
        ? 'text-blue-400 bg-blue-500/10 md:bg-blue-500/20'
        : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
    );

  return (
    <NavLink to={to} className={navLinkClasses}>
      {icon}
      <span className="md:hidden">{label}</span>
      <span className="hidden md:inline">{label}</span>
    </NavLink>
  );
};

export const MainLayout = () => {
  const { activeTheme: themeFromStore } = useThemeStore();
  // Estado local para garantir que o tema correto seja renderizado no lado do cliente
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.encontro_rios);

  // Efeito para sincronizar o tema do store (que pode vir do localStorage)
  // com o estado local do componente. Isso evita problemas de hidratação.
  useEffect(() => {
    setCurrentTheme(themeFromStore);
  }, [themeFromStore]);

  return (
    <div className={clsx(
      "w-screen h-screen flex flex-col md:flex-row text-white overflow-hidden bg-gradient-to-br transition-colors duration-500",
      currentTheme.background
    )}>
      {/* Barra Lateral de Navegação (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col p-4 bg-black/20 backdrop-blur-md border-r border-white/10">
        <div className="font-bold text-xl mb-8">Projeto Iara</div>
        <nav className="flex flex-col gap-2">
          <NavItem to="/explore" icon={<MapIcon size={20} />} label="Mapa" />
          <NavItem to="/locations" icon={<List size={20} />} label="Locais" />
          <NavItem to="/trails" icon={<Footprints size={20} />} label="Trilhas" />
          <NavItem to="/profile" icon={<User size={20} />} label="Perfil" />
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Barra de Abas (Mobile) */}
      <footer className="md:hidden order-first md:order-last fixed bottom-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-lg border-t border-white/10 z-10">
        <nav className="h-full grid grid-cols-4">
          <NavItem to="/explore" icon={<MapIcon size={24} />} label="Mapa" />
          <NavItem to="/locations" icon={<List size={24} />} label="Locais" />
          <NavItem to="/trails" icon={<Footprints size={24} />} label="Trilhas" />
          <NavItem to="/profile" icon={<User size={24} />} label="Perfil" />
        </nav>
      </footer>
    </div>
  );
};