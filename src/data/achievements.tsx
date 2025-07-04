// src/data/achievements.tsx
import React from 'react';
import { Footprints, Camera, BookOpen } from 'lucide-react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export const allAchievements: Achievement[] = [
  {
    id: 'centro-historico-completo',
    name: 'Explorador do Centro Histórico',
    description: 'Você completou a Trilha do Centro Histórico e visitou seus ícones.',
    icon: <Footprints size={24}/>,
  },
  {
    id: 'primeira-ar',
    name: 'Viajante do Tempo',
    description: 'Você usou a Realidade Aumentada pela primeira vez.',
    icon: <Camera size={24}/>,
  },
  {
    id: 'todos-locais',
    name: 'Historiador de Manaus',
    description: 'Você interagiu com todos os pontos históricos disponíveis.',
    icon: <BookOpen size={24}/>,
  },
];