"use client"
import { DollarSign, Plus, Minus } from "lucide-react"

interface RecargarCreditosProps {
  creditosSeleccionados: number
  setCreditosSeleccionados: (creditos: number) => void
  onRecargar: () => void
}

export function RecargarCreditos({
  creditosSeleccionados,
  setCreditosSeleccionados,
  onRecargar,
}: RecargarCreditosProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center gap-3">
        <DollarSign className="h-6 w-6 text-rose-500" />
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
        <button onClick={onRecargar} className="w-full rounded-md bg-rose-600 py-2 text-white hover:bg-rose-700">
          Recargar Ahora
        </button>
      </div>
    </div>
  )
}

