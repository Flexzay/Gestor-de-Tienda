import {
  User,
  MapPin,
  DollarSign,
  Printer,
  Eye,
  RefreshCw,
  Package,
  Loader,
  AlertCircle
} from "lucide-react";
import { useOrderList } from "../../../hooks/bashboard/useOrderList";
import OrderDetailsModal from "./OrderDetailModal";
import { useState, useEffect } from "react";
import domiduck from "../../../assets/img/domiduck.svg";
import Paginator from "../shop/Paginator"; 

interface OrderListProps {
  refreshKey?: number;
}

const CompanyLogo = () => (
  <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
    <img src={domiduck} alt="Logo Empresa" className="w-full h-full object-contain" />
  </div>
);

const OrderList = ({ refreshKey }: OrderListProps) => {
  const {
    orders,
    loading,
    error,
    getStatusColor,
    getStatusIconComponent,
    formatCurrency,
    formatDate,
    refetch
  } = useOrderList(refreshKey);

  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Estados para modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Calcula los pedidos visibles según paginación
  const totalItems = orders.length;
  const pagedOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Resetea página si cambian itemsPerPage o la lista
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, orders]);

  const handleOpenDetails = (order: any) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCloseDetails = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="h-8 w-8 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600">Cargando pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <p className="text-red-700">{error}</p>
        </div>
        <button
          onClick={refetch}
          className="mt-2 inline-flex items-center text-sm text-red-600 hover:text-red-800"
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          Intentar nuevamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {totalItems === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pedidos en sitio</h3>
          <p className="text-gray-500 mb-6">Los nuevos pedidos aparecerán aquí automáticamente.</p>
          <button
            onClick={refetch}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Recargar lista
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {pagedOrders.map((order) => {
              const status = order.states?.[order.states.length - 1]?.label || "Pendiente";
              const statusColorClass = getStatusColor(status);
              const StatusIcon = getStatusIconComponent(status);

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CompanyLogo />
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{order.code || order.id}</h3>
                          <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                        </div>
                      </div>
                      <div
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColorClass}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        <span className="ml-1">{status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Cliente</p>
                        <p className="text-sm text-gray-600">{order.user?.name || "Cliente no registrado"}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Mesa</p>
                        <p className="text-sm text-gray-600">{order.space?.name || "No asignada"}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Total</p>
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(order.total)}</p>
                      </div>
                    </div>

                    {order.items && order.items.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600">
                          <Package className="w-4 h-4 inline mr-1" />
                          {order.items.length} {order.items.length === 1 ? "producto" : "productos"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <Printer className="w-4 h-4 mr-1" />
                      Imprimir
                    </button>
                    <button
                      onClick={() => handleOpenDetails(order)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Detalles
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <Paginator
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
            onItemsPerPageChange={(num) => setItemsPerPage(num)}
          />
        </>
      )}

      {/* Modal de Detalles */}
      <OrderDetailsModal isOpen={modalOpen} onClose={handleCloseDetails} order={selectedOrder} />
    </div>
  );
};

export default OrderList;
