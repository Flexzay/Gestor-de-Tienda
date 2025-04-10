import React from "react";
import Domiduck from "../../assets/img/domiduck.svg";
import { motion } from "framer-motion";

const DashboardImageCard: React.FC<{ className?: string }> = ({ className = "" }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={`relative overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 text-white h-40 flex ${className}`}
  >
    {/* Fondo con patrón sutil */}
    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')]"></div>
    
    {/* Contenido */}
    <div className="relative z-10 flex items-center p-6 w-full">
      <img 
        src={Domiduck} 
        alt="Domiduck Logo" 
        className="w-20 h-20 mr-4 flex-shrink-0" 
      />
      <div>
        <h3 className="text-xl font-bold uppercase tracking-wider mb-1">
          Domiduck
        </h3>
        <p className="text-sm opacity-90">
          Innovación y calidad
        </p>
      </div>
    </div>
  </motion.div>
);

export default DashboardImageCard;