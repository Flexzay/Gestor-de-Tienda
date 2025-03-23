import React from "react";
import Domiduck from "../../assets/img/domiduck.svg"; // ✅ Importamos la imagen correctamente

const DashboardImageCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div
    className="relative bg-cover bg-center rounded-xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between min-w-0 overflow-hidden border border-gray-200 dark:border-gray-700 h-48"
    style={{ backgroundImage: `url(${Domiduck})` }} // ✅ Usamos la imagen importada
  >
    {/* Capa oscura opcional */}
    <div className="absolute inset-0  bg-opacity-20 rounded-xl"></div>

    {/* Contenido de la card */}
    <div className="relative z-10 text-center text-white">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  </div>
);

export default DashboardImageCard;
