import React from "react";
import Domiduck from "../../assets/img/domiduck.svg";
import { motion } from "framer-motion";

const DashboardImageCard: React.FC<{ className?: string }> = ({ className = "" }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={`relative overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 text-white w-full max-w-xs md:max-w-md lg:max-w-lg h-48 flex ${className}`}
  >
    {/* Fondo con patrón */}
    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')]"></div>
    
    {/* Contenido ampliado */}
    <div className="relative z-10 flex items-center p-4 md:p-6 lg:p-8 w-full">
  <img 
    src={Domiduck} 
    alt="Domiduck Logo" 
    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mr-4 md:mr-6 flex-shrink-0" 
  />
  <div className="flex flex-col justify-center min-w-0">
    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wide truncate">
      Domiduck
    </h3>
    <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 truncate">
      Innovación y calidad
    </p>
  </div>
</div>

  </motion.div>
);

export default DashboardImageCard;
