import  { useState } from "react";
import { ArrowLeft,Link } from "lucide-react";
import SalesTabs from "./SalesTabs";
import NewSaleTab from "./NewSaleTab";
import SalesHistoryTab from "./SalesHistoryTab";
import SaleDetails from "./SaleDetails";

const SalesSystem = () => {
  const [activeTab, setActiveTab] = useState("newSale");
  const [viewingSale, setViewingSale] = useState(null);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/dashboard"
          className="flex items-center text-gray-600 hover:text-[#ff204e] transition-colors duration-300"
        >
          <ArrowLeft className="mr-2" size={24} />
          <span className="font-medium">Volver al Dashboard</span>
        </Link>
      </div>

      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Sistema de Ventas</h2>

      <SalesTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "newSale" ? (
        <NewSaleTab />
      ) : viewingSale ? (
        <SaleDetails sale={viewingSale} onClose={() => setViewingSale(null)} />
      ) : (
        <SalesHistoryTab onViewSale={setViewingSale} />
      )}
    </div>
  );
};

export default SalesSystem;