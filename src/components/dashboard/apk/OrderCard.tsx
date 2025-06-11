import type { CardOrder } from "../../../interface/cardOrdes";

interface Props {
  order: CardOrder;
   urlS3: string;
  getStatusText: (status: number) => string;
  getStatusColor: (status: number) => string;
  getTotalProducts: (order: CardOrder) => number;
  onChangeStatus: (id: number, newStatus: number) => void;
  openModal: (order: CardOrder) => void;
}

export default function OrderCard({
  order,
  getStatusText,
  getStatusColor,
  onChangeStatus,
  openModal,
}: Props) {
  const nextStatus = order.status === 1 ? 2 : order.status === 2 ? 3 : 5;

  return (
    <div className="border rounded-xl p-4 bg-gray-50 shadow">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">Pedido #{order.id}</p>
          <p className={`text-sm mt-1 px-2 py-1 rounded-full inline-block ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </p>
        </div>
        <button
          onClick={() => openModal(order)}
          className="text-sm text-blue-600 hover:underline"
        >
          Ver
        </button>
      </div>

      <ul className="mt-3 text-sm space-y-1">
        {order.products.map((product) => (
          <li key={product.id}>
            {product.quantity}× {product.name}
            {product.description && (
              <div className="text-gray-500 text-xs ml-2">{product.description}</div>
            )}
          </li>
        ))}
      </ul>

      {order.status < 3 && (
        <button
          onClick={() => onChangeStatus(order.id, nextStatus)}
          className="mt-3 w-full py-1.5 text-white bg-blue-600 rounded hover:bg-blue-700 text-sm"
        >
          {order.status === 1 ? "Aceptar pedido" : "Marcar como listo"}
        </button>
      )}
    </div>
  );
}
