import React from "react";
import { ShoppingCart, BarChart2 } from "lucide-react";

const SalesTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-200 mb-8">
      <button
        className={`py-4 px-6 font-medium text-sm focus:outline-none ${
          activeTab === "newSale" ? "text-[#ff204e] border-b-2 border-[#ff204e]" : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("newSale")}
      >
        <ShoppingCart className="inline mr-2" size={18} />
        Nueva Venta
      </button>
      <button
        className={`py-4 px-6 font-medium text-sm focus:outline-none ${
          activeTab === "history" ? "text-[#ff204e] border-b-2 border-[#ff204e]" : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("history")}
      >
        <BarChart2 className="inline mr-2" size={18} />
        Historial de Ventas
      </button>
    </div>
  );
};

export default SalesTabs;