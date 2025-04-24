import { motion } from "framer-motion";
import { MapPin, Clock, ChevronRight, LucideIcon } from "lucide-react";



interface Store {
  id: number;
  name: string;
  type: string;
  location: string;
  hours: string;
  color: string;
  image?: string;
  icon: LucideIcon; 
}


interface StoreCardProps {
  store: Store;
  isHovered: boolean;
  onHover: (id: number | null) => void;
  onSelect: (id: number) => void;
}

const StoreCard = ({ store, isHovered, onHover, onSelect }: StoreCardProps) => {
  return (
    <motion.div
      key={store.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: store.id * 0.1 }}
      className="relative"
      onMouseEnter={() => onHover(store.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(store.id)}
    >
      <div className="relative overflow-hidden rounded-xl cursor-pointer group h-full">
        <div className={`absolute inset-0 bg-gradient-to-br ${store.color} opacity-90 z-10`}></div>
        <div className="absolute inset-0 z-0">
          <img
            src={store.image || "/placeholder.svg"}
            alt={store.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="relative z-20 p-6 h-full flex flex-col">
          <div className="mb-auto">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <store.icon className="text-white" size={24} />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{store.name}</h2>
            <p className="text-white/80 text-sm">{store.type}</p>
          </div>
          <div className="mt-6">
            <div className="flex items-center text-white/80 text-sm mb-1">
              <MapPin size={16} className="mr-2" />
              {store.location}
            </div>
            <div className="flex items-center text-white/80 text-sm">
              <Clock size={16} className="mr-2" />
              {store.hours}
            </div>
          </div>
          <motion.div
            className="mt-6 flex items-center justify-between"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: isHovered ? 1 : 0.6 }}
          >
            <span className="text-white font-medium">Seleccionar</span>
            <motion.div
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
              animate={{ x: isHovered ? 5 : 0 }}
            >
              <ChevronRight className="text-white" size={18} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default StoreCard;