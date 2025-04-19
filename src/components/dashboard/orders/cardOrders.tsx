import { useState } from "react";
import { ChevronDown, ChevronUp, Truck, ShoppingBag } from "lucide-react";

export default function PedidoCard({ order, onView, onContinue }) {
    const [isOpen, setIsOpen] = useState(false);
    const isDomicilio = order.delivery_type === "domicilio";
    const status = order.status;
  
    return (
      <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-md hover:border-primary transition-all duration-300 mt-4 overflow-hidden">
        {/* Header */}
        <div className={`p-6 ${isDomicilio ? "bg-orange-50" : "bg-blue-50"}`}>
          <div className="flex justify-between items-center">
            <h3 className={`text-2xl font-bold flex items-center ${isDomicilio ? "text-orange-800" : "text-blue-800"}`}>
              <span className="mr-2">
                {isDomicilio ? <Truck className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
              </span>
              {isDomicilio ? "Domicilio" : "Pedido"} #{order.code}
            </h3>
  
            <span className={`px-4 py-1 text-sm font-semibold rounded-full flex items-center ${status === 5 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${status === 5 ? "bg-green-500" : "bg-yellow-500"}`}></span>
              {status === 5 ? "Entregado" : "En Proceso"}
            </span>
          </div>
  
          {/* Resumen */}
          <div className="mt-4 text-sm text-gray-600 flex justify-between items-center">
            <span className="flex items-center">🧺 Productos: {order.products.length}</span>
            <span className="font-semibold text-lg flex items-center">💰 Total: ${order.total.toLocaleString()}</span>
          </div>
        </div>
  
        {/* Detalles expandibles */}
        <div className="border-t border-gray-200">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-6 py-4 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 flex justify-between items-center transition duration-200"
          >
            <span className="flex items-center">📄 Detalles del {isDomicilio ? "cliente" : "pedido"}</span>
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
  
          {isOpen && (
            <div className="px-6 py-4 bg-white text-sm text-gray-700">
              {isDomicilio ? (
                <>
                  <p><strong>Cliente:</strong> {order.user.name}</p>
                  <p><strong>Dirección:</strong> {order.user.address}</p>
                  <p><strong>Teléfono:</strong> {order.user.phone}</p>
                </>
              ) : (
                order.products.map((p) => (
                  <p key={p.id}><strong>{p.name}:</strong> x{p.amount}</p>
                ))
              )}
            </div>
          )}
        </div>
  
        {/* Domiciliario */}
        {isDomicilio && status === 5 && order.delivery_user && (
          <div className="px-6 py-4 bg-white border-t border-gray-200">
            <p className="text-sm text-gray-700">
              <strong>Domiciliario:</strong> {order.delivery_user.name} (📞 {order.delivery_user.phone})
            </p>
          </div>
        )}
  
        {/* Botones de acción */}
        <div className="flex justify-end gap-4 px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={onContinue}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-all"
          >
            Continuar
          </button>
          <button
            onClick={onView}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm px-4 py-2 rounded-lg transition-all"
          >
            Ver Pedido
          </button>
        </div>
      </div>
    );
  }
  
