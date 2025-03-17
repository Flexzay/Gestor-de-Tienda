import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SalesTabs from "./SalesTabs";
import NewSaleTab from "./NewSaleTab";
import SalesHistoryTab from "./SalesHistoryTab";
import SaleDetails from "./SaleDetails";

const SalesSystem = () => {
  const [activeTab, setActiveTab] = useState<"newSale" | "salesHistory">("newSale");
  const [viewingSale, setViewingSale] = useState<any | null>(null);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      {/* Botón de volver */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/dashboard"
          className="flex items-center text-gray-600 hover:text-[#ff204e] transition-colors duration-300"
        >
          <ArrowLeft className="mr-2" size={24} />
          <span className="font-medium">Volver al Dashboard</span>
        </Link>
      </div>

      {/* Título */}
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Sistema de Ventas</h2>

      {/* Tabs de navegación */}
      <SalesTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Renderizado condicional de contenido */}
      {viewingSale ? (
        <SaleDetails sale={viewingSale} onClose={() => setViewingSale(null)} />
      ) : activeTab === "newSale" ? (
        <NewSaleTab />
      ) : (
        <SalesHistoryTab onViewSale={setViewingSale} />
      )}
    </div>
  );
};

export default SalesSystem;
