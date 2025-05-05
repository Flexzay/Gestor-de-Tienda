"use client"

import { Edit, Trash2 } from "lucide-react"
import type { Mesa, ItemPedido } from "../../../interface/onsine"

interface ListaMesasProps {
  mesas: Mesa[]
  onEliminar: (id: number) => void
  onEditar: (mesa: Mesa) => void
}

export default function ListaMesas({ mesas, onEliminar, onEditar }: ListaMesasProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mesas.length === 0 ? (
        <div className="col-span-full text-center py-10 text-gray-500">
          No hay mesas activas. Crea un nuevo pedido para comenzar.
        </div>
      ) : (
        mesas.map((mesa) => (
          <div
            key={mesa.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="bg-gray-50 p-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Mesa {mesa.numero}</h3>
                  {mesa.cliente && <p className="text-sm text-gray-500">Cliente: {mesa.cliente}</p>}
                  <p className="text-xs text-gray-500">{formatDate(mesa.fecha)}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                    onClick={() => onEditar(mesa)}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-red-100 transition-colors text-red-500"
                    onClick={() => onEliminar(mesa.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {mesa.items.map((item: ItemPedido) => (
                  <div key={item.producto.id} className="flex justify-between text-sm py-1 border-b border-gray-100">
                    <span className="font-medium">
                      {item.producto.nombre} <span className="text-gray-500">x{item.cantidad}</span>
                    </span>
                    <span>{formatCurrency(item.producto.precio * item.cantidad)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 mt-3 flex justify-between font-medium text-lg border-t">
                <span>Total:</span>
                <span className="text-blue-600">{formatCurrency(mesa.total)}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
