// src/store/achievementsStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { allAchievements } from '../data/achievements.tsx';

interface AchievementsState {
  unlockedIds: string[];
  unlockAchievement: (achievementId: string) => void;
}

export const useAchievementsStore = create<AchievementsState>()(
  persist(
    (set, get) => ({
      unlockedIds: [],

      unlockAchievement: (achievementId) => {
        if (get().unlockedIds.includes(achievementId)) {
          return;
        }

        set(state => ({ unlockedIds: [...state.unlockedIds, achievementId] }));
        
        const achievement = allAchievements.find(a => a.id === achievementId);
        if (achievement) {
          setTimeout(() => {
            alert(`Conquista Desbloqueada: ${achievement.name}!`);
          }, 500);
        }
      },
    }),
    {
      name: 'iara-achievements-storage',
    }
  )
);