import React from "react";
import DashboardCardProps from "../../interface/DashboardCardProps";

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  className = ""
}) => (
  <div className={`relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col min-w-0 overflow-hidden border border-gray-200 dark:border-gray-700 h-48 ${className}`}>
    {/* Decoración diagonal más grande */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff204e] dark:bg-[#ff3b61] opacity-10 transform rotate-12 origin-bottom-left"></div>
    
    <div className="flex items-start gap-5 h-full">
      <div className="p-4 rounded-xl bg-gradient-to-br from-[#ff204e] to-[#ff3b61] text-white shadow-md flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0 flex flex-col h-full">
        <h3 className="text-base md:text-lg font-semibold text-gray-500 dark:text-gray-300 mb-2">
          {title}
        </h3>
        <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-auto">
          {value}
        </p>
        <div className="mt-4 h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#ff204e] to-[#ff3b61] rounded-full transition-all duration-700"
            style={{ width: '75%' }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardCard;