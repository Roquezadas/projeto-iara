// src/components/molecules/LocationCard.tsx
import { motion } from 'framer-motion';
import type { Location } from '../../store/locationsStore';

interface LocationCardProps {
  location: Location;
  // O onClick foi removido daqui para evitar confusão.
  // O clique será gerido pela página que usa o cartão.
}

export const LocationCard = ({ location }: LocationCardProps) => (
  <motion.div
    layoutId={`location-card-${location.id}`}
    className="rounded-lg overflow-hidden cursor-pointer relative group shadow-lg"
    whileHover={{ scale: 1.03 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    <img src={location.image} alt={location.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
    <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg drop-shadow-lg">{location.name}</h3>
  </motion.div>
);