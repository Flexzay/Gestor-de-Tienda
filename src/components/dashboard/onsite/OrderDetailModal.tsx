import React from "react";
import { Dialog } from "@headlessui/react";
import { X, Package } from "lucide-react";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-40" aria-hidden="true" />
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-50">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-bold text-gray-900">
              Detalles del pedido
            </Dialog.Title>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <p><strong>ID / Código:</strong> {order.code || order.id}</p>
            <p><strong>Cliente:</strong> {order.user?.name || "Cliente no registrado"}</p>
            <p><strong>Mesa:</strong> {order.space?.name || "No asignada"}</p>
            <p><strong>Total:</strong> ${Number(order.total).toLocaleString()}</p>

            {/* Productos */}
            {order.items?.length > 0 ? (
              <div>
                <p className="font-medium text-gray-900 mt-4 mb-2">Productos:</p>
                <ul className="list-disc list-inside space-y-2">
                  {order.items.map((item: any, idx: number) => (
                    <li key={idx} className="text-gray-800">
                      {item.name || "Producto"} × {item.amount || 1}
                      {item.observation && (
                        <p className="ml-4 text-xs text-gray-500 italic">
                          Nota: {item.observation}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-4">
                <Package className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                No hay productos asociados al pedido.
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default OrderDetailsModal;
