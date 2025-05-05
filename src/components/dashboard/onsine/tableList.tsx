// components/ListaMesas.tsx
import { Edit, Trash2 } from "lucide-react"
import { Mesa, ItemPedido } from "../../../interface/onsine"

interface ListaMesasProps {
  mesas: Mesa[]
  onEliminar: (id: number) => void
  onEditar: (mesa: Mesa) => void
}

export default function ListaMesas({ mesas, onEliminar, onEditar }: ListaMesasProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mesas.map((mesa) => (
        <div key={mesa.id} className="border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium text-lg">Mesa {mesa.numero}</h3>
              {mesa.cliente && <p className="text-sm text-gray-500">Cliente: {mesa.cliente}</p>}
              <p className="text-xs text-gray-500">{new Date(mesa.fecha).toLocaleString()}</p>
            </div>
            <div className="flex gap-1">
              <button
                className="h-8 w-8 p-2 bg-transparent hover:bg-gray-200 rounded-full"
                onClick={() => onEditar(mesa)}
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                className="h-8 w-8 p-2 bg-transparent hover:bg-gray-200 rounded-full text-red-500"
                onClick={() => onEliminar(mesa.id)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-1 my-2">
            {mesa.items.map((item: ItemPedido) => (
              <div key={item.producto.id} className="flex justify-between text-sm">
                <span>{item.producto.nombre} x{item.cantidad}</span>
                <span>{item.producto.precio * item.cantidad}€</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-2 mt-2 flex justify-between font-medium">
            <span>Total:</span>
            <span>{mesa.total}€</span>
          </div>
        </div>
      ))}
    </div>
  )
}
