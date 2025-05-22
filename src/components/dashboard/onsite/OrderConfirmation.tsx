import React from "react";
import { CheckCircle } from "lucide-react";

interface OrderConfirmationProps {
  order: {
    id: string;
    client?: { name: string; phone?: string };
    space?: { name: string };
    status: string;
    orderDetails: Array<{
      id: number;
      name: string;
      price: number;
      quantity: number;
    }>;
    total: number;
    createdAt?: string;
  };
  onNewOrder: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, onNewOrder }) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">¡Pedido Confirmado!</h2>
        <p className="text-gray-600 mt-2">N° {order.id}</p>
        <p className="text-sm text-gray-500 mt-1">
          {order.createdAt ? new Date(order.createdAt).toLocaleString() : new Date().toLocaleString()}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Cliente:</span>
          <span className="font-medium">{order.client?.name || 'No especificado'}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Mesa:</span>
          <span className="font-medium">{order.space?.name || 'No especificada'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Estado:</span>
          <span className="font-medium capitalize">{order.status.toLowerCase()}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <h3 className="font-semibold text-lg mb-3">Detalles del Pedido</h3>
        <ul className="space-y-2">
          {order.orderDetails.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.quantity}x {item.name}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onNewOrder}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Crear Nuevo Pedido
      </button>
    </div>
  );
};

export default OrderConfirmation;