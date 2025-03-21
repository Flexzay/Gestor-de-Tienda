import React from "react";
import { BarChart2, Search, Eye, Printer, FileText } from "lucide-react";

const SalesHistoryTab = ({ onViewSale }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      {/* Título de la sección con icono */}
      <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
        <BarChart2 className="mr-2 text-[#ff204e]" size={20} />
        Historial de Ventas
      </h3>

      {/* Barra de búsqueda y filtros por fecha */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Campo de búsqueda */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Buscar ventas..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>

        {/* Filtros de fecha */}
        <div className="flex gap-2">
          <input
            type="date"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
          />
          <span className="self-center">-</span>
          <input
            type="date"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
          />
        </div>
      </div>

      {/* Botones de filtro por estado de venta */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button className="px-4 py-2 rounded-md bg-[#ff204e] text-white">Todas</button>
        <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-800">Pagadas</button>
        <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-800">Pendientes</button>
        <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-800">Pago Parcial</button>
      </div>

      {/* Tabla de ventas */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venta</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Aquí se mostrarán las filas dinámicamente */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesHistoryTab;
