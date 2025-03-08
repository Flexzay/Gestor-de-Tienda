import React from "react";

const DashboardCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({
  title,
  value,
  icon,
}) => (
  <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col min-w-0 overflow-hidden border border-gray-200 dark:border-gray-700">
    {/* Decoración en la esquina superior derecha */}
    <div className="absolute top-0 right-0 w-16 h-16 bg-[#ff204e] dark:bg-[#ff3b61] rounded-bl-full opacity-20"></div>
    
    <div className="flex items-center space-x-4">
      <div className="p-4 rounded-lg bg-[#ff204e] dark:bg-[#ff3b61] text-white shadow-md">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
        <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      </div>
    </div>
    
    {/* Barra de progreso animada */}
    <div className="mt-4 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div className="h-2 bg-[#ff204e] dark:bg-[#ff3b61] rounded-full w-2/3 transition-all duration-700"></div>
    </div>
  </div>
);

export default DashboardCard;
