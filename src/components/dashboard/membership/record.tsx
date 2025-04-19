"use client"

import { useEffect, useState } from "react"
import { membershipService } from "../../../Services/membership.service"
import { History, ShoppingCart, AlertCircle } from "lucide-react"

interface Compra {
  id: string
  created_at: string
  ducks: number
  status: string
}

export function HistorialCompras() {
  const [historialCompras, setHistorialCompras] = useState<Compra[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await membershipService.getHistoryCharges()
        if (response.status === 200) {
          setHistorialCompras(response.data.history || [])
        } else {
          console.error("Error al cargar historial:", response.message)
        }
      } catch (error) {
        console.error("Error en la carga del historial:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistorial()
  }, [])

  // Función para determinar el color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted_company":
        return "bg-emerald-100 text-emerald-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Función para traducir el estado
  const getStatusText = (status: string) => {
    switch (status) {
      case "accepted_company":
        return "Aceptado"
      case "pending":
        return "Pendiente"
      case "rejected":
        return "Rechazado"
      default:
        return status || "Estado no disponible"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white shadow sm:rounded-lg">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-t-2 border-b-2 border-amber-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Cargando historial...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-amber-100 rounded-full mr-3">
            <History className="h-6 w-6 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Historial de Compras</h3>
        </div>
        <p className="mt-2 text-sm text-gray-500">Detalles de tus compras de créditos.</p>
      </div>

      {historialCompras.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="p-3 bg-gray-100 rounded-full mb-4">
            <ShoppingCart className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No hay compras registradas</h3>
          <p className="text-gray-500 max-w-md">
            Aún no has realizado ninguna compra de créditos. Cuando realices tu primera compra, aparecerá aquí.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cantidad
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {historialCompras.map((compra) => (
                <tr key={compra.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-gray-100">
                        <History className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(compra.created_at).toLocaleDateString("es-CO", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(compra.created_at).toLocaleTimeString("es-CO", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{compra.ducks}</span>
                      <span className="ml-1 text-sm text-gray-500">créditos</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(compra.status)}`}
                    >
                      {getStatusText(compra.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {historialCompras.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center text-sm text-gray-500">
            <AlertCircle className="h-4 w-4 mr-2" />
            <p>Se muestran las últimas {historialCompras.length} transacciones.</p>
          </div>
        </div>
      )}
    </div>
  )
}
