import { useState } from "react"
import { CreditCard, History, Plus, Minus, DollarSign, Clock, CheckCircle } from "lucide-react"
import Sidebar from "../Sidebar"

export default function MenbershipCreditos() {
  const [creditos, setCreditos] = useState(100)
  const [creditosSeleccionados, setCreditosSeleccionados] = useState(50)

  // Datos de ejemplo del historial de compras
  const historialCompras = [
    { id: 1, fecha: "01/04/2023", cantidad: 100, estado: "Completado" },
    { id: 2, fecha: "15/03/2023", cantidad: 50, estado: "Completado" },
    { id: 3, fecha: "28/02/2023", cantidad: 200, estado: "Completado" },
  ]

  return (
    
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        
      <div className="mx-auto max-w-6xl space-y-8">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Panel de Créditos</h1>

        {/* Sección de Créditos Actuales */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center gap-3">
            <CreditCard className="h-6 w-6 text-emerald-500" />
            <h2 className="text-xl font-semibold text-gray-800">Créditos Actuales</h2>
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-bold text-emerald-600">{creditos}</span>
            <span className="ml-2 text-gray-500">créditos disponibles</span>
          </div>
        </div>

        {/* Sección de Selección de Créditos */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center gap-3">
            <DollarSign className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-800">Recargar Créditos</h2>
          </div>

          <div className="mt-6">
            <label htmlFor="creditos" className="block text-sm font-medium text-gray-700">
              Selecciona el número de créditos a recargar
            </label>

            <div className="mt-2 flex items-center">
              <button
                onClick={() => setCreditosSeleccionados(Math.max(10, creditosSeleccionados - 10))}
                className="rounded-l-md border border-gray-300 bg-gray-50 p-2 text-gray-500 hover:bg-gray-100"
              >
                <Minus className="h-5 w-5" />
              </button>

              <input
                type="number"
                id="creditos"
                value={creditosSeleccionados}
                onChange={(e) => setCreditosSeleccionados(Number(e.target.value))}
                className="w-full border-y border-gray-300 p-2 text-center text-lg"
              />

              <button
                onClick={() => setCreditosSeleccionados(creditosSeleccionados + 10)}
                className="rounded-r-md border border-gray-300 bg-gray-50 p-2 text-gray-500 hover:bg-gray-100"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2">
              {[10, 50, 100, 200].map((cantidad) => (
                <button
                  key={cantidad}
                  onClick={() => setCreditosSeleccionados(cantidad)}
                  className={`rounded-md border p-2 text-center ${
                    creditosSeleccionados === cantidad
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {cantidad}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setCreditos(creditos + creditosSeleccionados)}
              className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
            >
              Recargar Ahora
            </button>
          </div>
        </div>

        {/* Sección de Resumen */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-purple-500" />
            <h2 className="text-xl font-semibold text-gray-800">Resumen</h2>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-600">Créditos Seleccionados:</span>
              <span className="font-medium">{creditosSeleccionados}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-600">Precio por Crédito:</span>
              <span className="font-medium">$1.00</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${creditosSeleccionados.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-lg font-semibold text-gray-800">Total:</span>
              <span className="text-lg font-bold text-blue-600">${creditosSeleccionados.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Sección de Historial de Compras */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center gap-3">
            <History className="h-6 w-6 text-amber-500" />
            <h2 className="text-xl font-semibold text-gray-800">Historial de Compras</h2>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Cantidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {historialCompras.map((compra) => (
                  <tr key={compra.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-gray-400" />
                        <span>{compra.fecha}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{compra.cantidad} créditos</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        {compra.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {historialCompras.length === 0 && (
            <div className="mt-4 text-center text-gray-500">No hay historial de compras disponible</div>
          )}
        </div>
      </div>
    </div>
  )
}

