// src/components/SelectStore.tsx

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StoreList from "./SelectStore/StoreList";
import { Store, ShoppingBag, Coffee, Building2 } from "lucide-react";
import type StoreType from "../../interface/store"; 

function SelectStore() {
  const navigate = useNavigate();

  const stores: StoreType[] = [
    {
      id: 1,
      name: "Tienda Central",
      type: "Flagship Store",
      location: "Ciudad Capital",
      hours: "8:00 - 20:00",
      image: "/placeholder.svg?height=200&width=300",
      color: "from-purple-500 to-indigo-600",
      icon: Store,
    },
    {
      id: 2,
      name: "Centro Comercial Norte",
      type: "Shopping Mall",
      location: "Zona Norte",
      hours: "10:00 - 22:00",
      image: "/placeholder.svg?height=200&width=300",
      color: "from-pink-500 to-rose-600",
      icon: ShoppingBag,
    },
    {
      id: 3,
      name: "Café & Boutique",
      type: "Concept Store",
      location: "Distrito Creativo",
      hours: "9:00 - 21:00",
      image: "/placeholder.svg?height=200&width=300",
      color: "from-amber-500 to-orange-600",
      icon: Coffee,
    },
    {
      id: 4,
      name: "Sucursal Empresarial",
      type: "Business Center",
      location: "Distrito Financiero",
      hours: "8:00 - 18:00",
      image: "/placeholder.svg?height=200&width=300",
      color: "from-emerald-500 to-teal-600",
      icon: Building2,
    },
  ];

  const handleSelectStore = (store: StoreType) => {
    localStorage.setItem("selectedStore", store.id.toString());
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Selecciona tu Tienda
        </h1>
        <p className="text-gray-300 max-w-md mx-auto">
          Elige la tienda con la que deseas trabajar para acceder a tu dashboard personalizado
        </p>
      </motion.div>

      <StoreList stores={stores} onSelect={handleSelectStore} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12 text-gray-400 text-sm"
      >
        Selecciona la tienda con la que deseas trabajar hoy
      </motion.div>
    </div>
  );
}

export default SelectStore;
