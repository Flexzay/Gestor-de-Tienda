import { useState } from "react";

export default function PedidoModal({ order, onClose }) {
  const [activeTab, setActiveTab] = useState("itemDetails");

  const getStatusClass = (status) => {
    // Placeholder: agregá lógica real según el status
    return "bg-green-100 text-green-800";
  };

  const getStatusLabel = (status) => {
    // Placeholder: agregá lógica real según el status
    return "Entregado";
  };

  const getImage = (path) => path; // Adaptá según tu lógica de imágenes

  const lastVoucher = order?.vouchers?.at(-1);
  const states = [...order?.states]?.reverse();

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center" onClick={onClose}>
      <div className="relative mx-auto p-6 border w-11/12 max-w-3xl shadow-2xl rounded-lg bg-white" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Pedido {order.code}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(order.status)}`}>
            {getStatusLabel(order.status)}
          </span>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            {/* Cliente */}
            <SummaryItem icon="user" label="Cliente" value={order.user.name} />
            {/* Celular */}
            <SummaryItem icon="phone" label="Celular" value={order.user.phone} />
          </div>
          <div className="space-y-4">
            {/* Total */}
            <SummaryItem icon="currency-dollar" label="Total" value={`$${order.total.toLocaleString()}`} />
            {/* Fecha */}
            <SummaryItem icon="calendar" label="Fecha" value={new Date(order.states[0].created_at).toLocaleString()} />
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Método de Pago</h3>
          {lastVoucher ? (
            <div className="flex items-center bg-gray-100 p-4 rounded-lg">
              <img src={getImage(lastVoucher.method.img)} alt="Método de pago" className="h-12 w-12 rounded-md object-contain bg-white p-1" />
              <div className="ml-4">
                <p className="text-lg font-medium text-gray-800">{lastVoucher.method.label}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 italic">No registra método de pago</p>
          )}
        </div>

        {/* Observaciones */}
        {order.observations && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Observaciones</h3>
            <p className="text-gray-600 bg-gray-100 p-4 rounded-lg">{order.observations}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex border-b">
            <TabButton label="Productos" tab="itemDetails" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton label="Historial del pedido" tab="orderHistory" activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "itemDetails" ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative" style={{ maxHeight: "405px" }}>
            <table className="border-collapse table-auto w-full whitespace-nowrap bg-white">
              <thead>
                <tr className="text-left">
                  <Th title="Producto" />
                  <Th title="Valor U" />
                  <Th title="Cantidad" />
                  <Th title="Total" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img src={getImage(product.images[0].path)} alt={product.name} className="h-10 w-10 rounded-full object-cover" />
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">${product.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{product.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">${product.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
            <ol className="relative border-l border-gray-200 ml-3">
              {states.map((state, idx) => (
                <li key={state.id} className="mb-6 ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white bg-green-200">
                    <img src={getImage(state.svg)} alt="Icono estado" className="w-5 h-5" />
                  </span>
                  <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{state.label}</h3>
                      {idx === 0 && (
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">Actual</span>
                      )}
                    </div>
                    <time className="block mb-2 text-sm text-gray-400">
                      {new Date(state.created_at).toLocaleString()}
                    </time>
                    {state.observations && (
                      <p className="text-base text-gray-500">{state.observations}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Close Button */}
        <div className="mt-8 flex justify-end">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

// Subcomponentes
function SummaryItem({ icon, label, value }) {
  const icons = {
    user: "M16 7a4 4 0 11-8 0 4 4 0 018 0z M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493...",
    "currency-dollar": "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2...",
    calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7..."
  };
  return (
    <div className="flex items-center space-x-3">
      <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icons[icon]} />
      </svg>
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function TabButton({ label, tab, activeTab, setActiveTab }) {
  const isActive = activeTab === tab;
  return (
    <button
      className={`py-2 px-4 focus:outline-none border-b-2 ${
        isActive ? "border-green-500 text-green-500" : "border-transparent text-gray-500"
      }`}
      onClick={() => setActiveTab(tab)}
    >
      {label}
    </button> 
  );
}

function Th({ title }) {
  return (
    <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
      {title}
    </th>
  );
}
