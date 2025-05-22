import React from "react";
import { ProductFormData } from "../../../interface/product";
import { Trash2, Minus, Plus } from "lucide-react";

interface OrderItem extends ProductFormData {
  quantity: number;
  price: number; // aseguramos que sea número
}

interface OrderSummaryProps {
  items: OrderItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + Number(item.price ?? 0) * item.quantity, 0);

  return (
    <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Resumen del Pedido</h3>

      {items.length === 0 ? (
        <p className="text-gray-500">No hay productos seleccionados.</p>
      ) : (
        <table className="min-w-full table-auto text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Producto</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Cantidad</th>
              <th className="px-4 py-2">Subtotal</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              item.id !== undefined && (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2 text-center">
                    ${Number(item.price ?? 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                        onClick={() =>
                          onUpdateQuantity(item.id!, Math.max(1, item.quantity - 1))
                        }
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                        onClick={() => onUpdateQuantity(item.id!, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    ${(Number(item.price ?? 0) * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => onRemove(item.id!)}
                      className="text-red-600 hover:text-red-800"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            ))}

          </tbody>
        </table>
      )}

      {items.length > 0 && (
        <div className="mt-4 text-right text-lg font-semibold">
          Total: ${total.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default OrderSummary;