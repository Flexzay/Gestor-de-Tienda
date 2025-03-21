import React from "react";
import { X, Printer, FileText } from "lucide-react";

const SaleDetails = ({ sale, onClose }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      {/* Encabezado con título y botón de cierre */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Venta #{sale.saleNumber}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-[#ff204e]">
          <X size={24} />
        </button>
      </div>

      {/* Información de la venta y del cliente */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Datos de la venta */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-gray-700">Información de la Venta</h4>
          <p className="text-gray-600">Fecha: <span className="font-medium">{sale.date}</span></p>
          <p className="text-gray-600">Vendedor: <span className="font-medium">{sale.seller}</span></p>
          <p className="text-gray-600">Método de Pago: <span className="font-medium">{sale.paymentMethod}</span></p>
        </div>

        {/* Datos del cliente */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-gray-700">Cliente</h4>
          <p className="text-gray-600">{sale.client.name}</p>
          <p className="text-gray-600">{sale.client.email}</p>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-center space-x-4">
        {/* Botón para imprimir el recibo */}
        <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center shadow-sm">
          <Printer className="mr-2" size={20} />
          Imprimir Recibo
        </button>

        {/* Botón para generar factura */}
        <button className="px-6 py-3 bg-[#ff204e] text-white rounded-lg hover:bg-[#ff3b60] transition-colors duration-300 flex items-center justify-center shadow-sm">
          <FileText className="mr-2" size={20} />
          Generar Factura
        </button>
      </div>
    </div>
  );
};

export default SaleDetails;
