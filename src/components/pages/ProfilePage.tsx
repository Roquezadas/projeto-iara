// src/components/pages/ProfilePage.tsx
import React from 'react';
import { useThemeStore, themes, type ThemeName } from '../../store/themeStore';
import { useAchievementsStore } from '../../store/achievementsStore';
import { allAchievements, type Achievement } from '../../data/achievements.tsx';
import { Palette, CheckCircle, Lock, UserCircle, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const AchievementCard = ({ ach, isUnlocked }: { ach: Achievement, isUnlocked: boolean }) => (
  <motion.div 
    variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
    className={clsx(
      "p-4 rounded-lg flex items-center gap-4 border", 
      isUnlocked 
        ? 'bg-green-500/10 border-green-500/30' 
        : 'bg-slate-700/20 border-slate-700/50 opacity-60'
    )}
  >
    <div className={clsx("flex-shrink-0 p-3 rounded-full", isUnlocked ? "bg-green-500/20 text-green-400" : "bg-slate-600 text-slate-400")}>
      {React.cloneElement(ach.icon as React.ReactElement, { size: 24 })}
    </div>
    <div>
      <h3 className={clsx("font-bold", isUnlocked ? "text-white" : "text-slate-400")}>{ach.name}</h3>
      <p className="text-xs text-slate-400">{ach.description}</p>
    </div>
    <div className="ml-auto flex-shrink-0">
      {isUnlocked ? <CheckCircle className="text-green-500" /> : <Lock className="text-slate-500" />}
    </div>
  </motion.div>
);

export const ProfilePage = () => {
  const { activeTheme, setTheme } = useThemeStore();
  const { unlockedIds } = useAchievementsStore();

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <UserCircle size={32} className="text-slate-300"/>
        <div>
            <h1 className="text-3xl font-bold text-white">Perfil e Conquistas</h1>
            <p className="text-sm text-slate-400">Personalize sua experiência e veja seu progresso.</p>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-black/20 backdrop-filter backdrop-blur-md border border-white/10"
      >
        <div className="flex items-center gap-3 mb-4">
          <Palette className="text-white/80" />
          <h2 className="text-xl font-bold text-white">Temas da Amazônia</h2>
        </div>
        <p className="text-sm text-slate-400 mb-4">Escolha uma paleta de cores para personalizar sua experiência.</p>
        <div className="flex gap-4">
          {Object.values(themes).map(theme => (
            <button
              key={theme.name}
              onClick={() => setTheme(theme.name as ThemeName)}
              className={clsx( "w-16 h-16 rounded-full transition-all duration-300 bg-gradient-to-br", theme.background, activeTheme.name === theme.name ? 'ring-4 ring-offset-2 ring-offset-slate-900 ring-white' : 'scale-90 hover:scale-100' )}
              aria-label={`Mudar para o tema ${theme.name}`}
            />
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl bg-black/20 backdrop-filter backdrop-blur-md border border-white/10"
      >
        <h2 className="text-xl font-bold text-white mb-4">Suas Conquistas</h2>
        <motion.div 
          className="space-y-3"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {allAchievements.map(ach => (
            <AchievementCard key={ach.id} ach={ach} isUnlocked={unlockedIds.includes(ach.id)} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};