import React from "react";
import Domiduck from "../../assets/img/domiduck.svg";
import { motion } from "framer-motion";

const DashboardImageCard: React.FC = () => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="relative overflow-hidden rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 bg-gray-900 text-white h-48 flex flex-col justify-center items-center p-6"
  >
    {/* Imagen del logo cubriendo toda la tarjeta con opacidad */}
    <img 
      src={Domiduck} 
      alt="Logo de Domiduck" 
      className="absolute inset-0 w-full h-full object-cover opacity-50" 
    />
    
    {/* Capa oscura para mejor legibilidad */}
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    
    {/* Contenido de la tarjeta */}
    <div className="relative z-10 text-center">
      <img src={Domiduck} alt="Domiduck Logo" className="w-28 h-28 mx-auto mb-2" />
      <h3 className="text-xl font-bold uppercase tracking-wide">Domiduck</h3>
      <p className="text-sm opacity-80">Innovación y calidad </p>
    </div>
  </motion.div>
);

export default DashboardImageCard;
