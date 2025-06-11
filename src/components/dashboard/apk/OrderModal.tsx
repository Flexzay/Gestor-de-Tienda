import React from "react";
import type { CardOrder } from "../../../interface/cardOrdes";

interface OrderModalProps {
  order: CardOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onChangeStatus: (id: number, newStatus: number) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ order, isOpen, onClose, onChangeStatus }) => {
  if (!isOpen || !order) return null;

  const getNextStatus = (status: number) => {
    if (status === 1) return 2;
    if (status === 2) return 3;
    return 5;
  };

  const getButtonText = (status: number) => {
    if (status === 1) return "Aceptar pedido";
    if (status === 2) return "Marcar como listo";
    if (status === 3) return "Marcar como completado";
    return "Estado final";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4">Detalles del pedido #{order.id}</h2>

        <ul className="space-y-2 mb-4">
          {order.products.map((product) => (
            <li key={product.id} className="text-sm">
              <strong>{product.quantity}×</strong> {product.name}
              {product.description && (
                <p className="text-xs text-gray-500 ml-2">{product.description}</p>
              )}
            </li>
          ))}
        </ul>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cerrar
          </button>
          {order.status < 5 && (
            <button
              onClick={() => {
                onChangeStatus(order.id, getNextStatus(order.status));
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {getButtonText(order.status)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
