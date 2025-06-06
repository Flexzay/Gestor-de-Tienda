import { History, ShoppingCart, AlertCircle } from "lucide-react"
import { Compra } from "../../../interface/membership"

interface HistorialComprasProps {
  historialCompras: Compra[];
}

export function HistorialCompras({ historialCompras }: HistorialComprasProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted_company":
        return "bg-emerald-100 text-emerald-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "accepted_company":
        return "Aceptado";
      case "pending":
        return "Pendiente";
      case "rejected":
        return "Rechazado";
      default:
        return status || "Estado no disponible";
    }
  };

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
        <div className="overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {historialCompras.map((compra) => (
                  <tr key={compra.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(compra.created_at).toLocaleDateString("es-CO")}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(compra.created_at).toLocaleTimeString("es-CO", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{compra.ducks}</span>
                      <span className="ml-1 text-sm text-gray-500">créditos</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(compra.status)}`}>
                        {getStatusText(compra.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4 px-4 py-4">
            {historialCompras.map((compra) => (
              <div key={compra.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <History className="w-4 h-4 text-gray-400" />
                    {new Date(compra.created_at).toLocaleDateString("es-CO")}
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(compra.status)}`}>
                    {getStatusText(compra.status)}
                  </span>
                </div>
                <div className="text-sm text-gray-800 font-medium">
                  {compra.ducks} <span className="text-gray-500 font-normal">créditos</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(compra.created_at).toLocaleTimeString("es-CO", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
          </div>
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
  );
}