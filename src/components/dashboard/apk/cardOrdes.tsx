import type { CardOrder } from '../../../interface/cardOrdes'

const CardOrder = ({ title, count, message, color }: CardOrder) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className={`text-white text-xs px-2 py-1 rounded-full ${color}`}>
          {count}
        </span>
      </div>
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

const CardsDePedidos = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <CardOrder
        title="Pedidos nuevos"
        count={0}
        message="No hay pedidos nuevos"
        color="bg-blue-500"
      />
      <CardOrder
        title="Pedidos aceptados / Preparación"
        count={0}
        message="No hay pedidos aceptados"
        color="bg-green-500"
      />
      <CardOrder
        title="Pedidos listos para despachar"
        count={0}
        message="No hay pedidos listos para despachar"
        color="bg-yellow-500"
      />
    </div>
  );
};

export default CardsDePedidos;
