import { useState } from "react";
import Onsite from "../../components/dashboard/onsite/onsite";
import OrderList from "../../components/dashboard/onsite/Orderlist";

function OnsitePage() {
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleNewOrderCreated = () => {
    setShowNewOrder(false);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {!showNewOrder ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Pedidos en Sitio</h1>
            <button
              onClick={() => setShowNewOrder(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Nuevo Pedido en Sitio
            </button>
          </div>
          <OrderList refreshKey={refreshKey} />
        </>
      ) : (
        <Onsite onCancel={handleNewOrderCreated} />
      )}
    </div>
  );
}

export default OnsitePage;