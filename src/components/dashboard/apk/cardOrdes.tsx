import { Package, CheckCircle, TruckIcon } from 'lucide-react';
import type { CardOrder } from '../../../interface/cardOrdes'

const CardOrder = ({ title, count, message, color, icon }: CardOrder) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 transition-all duration-200 hover:shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${color.replace('bg-', 'bg-opacity-20 text-')}`}>
            {icon}
          </div>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <span className={`text-white text-sm font-medium px-3 py-1 rounded-full ${color}`}>
          {count}
        </span>
      </div>
      <p className="text-gray-500 ml-12">{message}</p>
    </div>
  );
};

const CardsDePedidos = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <CardOrder
        title="Pedidos nuevos"
        count={0}
        message="No hay pedidos nuevos"
        color="bg-blue-500"
        icon={<Package className="h-5 w-5" />}
      />
      <CardOrder
        title="Pedidos aceptados / Preparación"
        count={0}
        message="No hay pedidos aceptados"
        color="bg-green-500"
        icon={<CheckCircle className="h-5 w-5" />}
      />
      <CardOrder
        title="Pedidos listos para despachar"
        count={0}
        message="No hay pedidos listos para despachar"
        color="bg-yellow-500"
        icon={<TruckIcon className="h-5 w-5" />}
      />
    </div>
  );
};

export default CardsDePedidos;

