import React from "react";
import { ShoppingCart, DollarSign } from "lucide-react";

// Componente que representa el panel del carrito de compras
const ShoppingCartPanel = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      {/* Título del carrito de compras con icono */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <ShoppingCart className="mr-2 text-[#ff204e]" size={20} />
        Carrito de Compra
      </h3>

      {/* Sección que muestra los productos en el carrito */}
      <div className="mb-4">
        <div className="text-center py-8 text-gray-500">El carrito está vacío</div>
      </div>

      {/* Resumen de la compra: subtotal, impuestos y total */}
      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex justify-between py-1">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-semibold">$0.00</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-gray-600">Impuestos:</span>
          <span className="font-semibold">$0.00</span>
        </div>
        <div className="flex justify-between py-2 text-lg font-bold border-t border-gray-200 mt-2">
          <span>Total:</span>
          <span className="text-[#ff204e]">$0.00</span>
        </div>
      </div>

      {/* Selección del método de pago */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Método de Pago</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]">
          <option value="efectivo">Efectivo</option>
          <option value="tarjeta">Tarjeta de Crédito/Débito</option>
        </select>
      </div>

      {/* Campo para añadir notas a la venta */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Notas</label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
          placeholder="Añadir notas a la venta..."
        ></textarea>
      </div>

      {/* Botones de acción: completar venta o cancelar */}
      <div className="flex flex-col space-y-2">
        <button className="w-full py-3 rounded-md bg-[#ff204e] text-white hover:bg-[#ff3b60] transition-colors duration-300 flex items-center justify-center">
          <DollarSign className="mr-2" size={20} />
          Completar Venta
        </button>
        <button className="w-full py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartPanel;
