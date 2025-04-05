import { History, Clock } from "lucide-react"

interface Compra {
  id: number
  fecha: string
  cantidad: number
  estado: string
}

interface HistorialComprasProps {
  historialCompras: Compra[]
}

export function HistorialCompras({ historialCompras }: HistorialComprasProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center gap-3">
        <History className="h-6 w-6 text-amber-500" />
        <h2 className="text-xl font-semibold text-gray-800">Historial de Compras</h2>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Cantidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Estado</th>
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
  )
}

