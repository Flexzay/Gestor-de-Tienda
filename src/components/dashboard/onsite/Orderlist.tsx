import { useEffect, useState } from "react"
import {
  Clock,User,MapPin,DollarSign,Printer,Eye,RefreshCw,Package,CheckCircle,AlertCircle,XCircle,Loader,
} from "lucide-react"
import { orderService } from "../../../Services/orderInSite.service"
import domiduck from "../../../assets/img/domiduck.svg";


const CompanyLogo = () => (
  <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
    <img src={domiduck} alt="Logo Empresa" className="w-full h-full object-contain" />
  </div>
)


interface OrderListProps {
  refreshKey?: number
}

const OrderList = ({ refreshKey }: OrderListProps) => {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const response = await orderService.getOnSiteOrders()
        setOrders(response.data || [])
        setError(null)
      } catch (err: any) {
        console.error(err)
        setError("Error al cargar pedidos")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [refreshKey])

  const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase() || "pendiente"
    if (statusLower.includes("completado") || statusLower.includes("entregado")) {
      return "bg-green-100 text-green-800 border-green-200"
    }
    if (statusLower.includes("preparando") || statusLower.includes("proceso")) {
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
    if (statusLower.includes("cancelado") || statusLower.includes("rechazado")) {
      return "bg-red-100 text-red-800 border-red-200"
    }
    return "bg-blue-100 text-blue-800 border-blue-200"
  }

  const getStatusIcon = (status: string) => {
    const statusLower = status?.toLowerCase() || "pendiente"
    if (statusLower.includes("completado") || statusLower.includes("entregado")) {
      return <CheckCircle className="w-4 h-4" />
    }
    if (statusLower.includes("preparando") || statusLower.includes("proceso")) {
      return <Clock className="w-4 h-4" />
    }
    if (statusLower.includes("cancelado") || statusLower.includes("rechazado")) {
      return <XCircle className="w-4 h-4" />
    }
    return <AlertCircle className="w-4 h-4" />
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} min`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `Hace ${hours}h`
    } else {
      return date.toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="h-8 w-8 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600">Cargando pedidos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pedidos en sitio</h3>
          <p className="text-gray-500 mb-6">Los nuevos pedidos aparecerán aquí automáticamente.</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Recargar lista
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => {
            const status = order.states?.[order.states.length - 1]?.label || "Pendiente"
            const statusColorClass = getStatusColor(status)
            const StatusIcon = () => getStatusIcon(status)

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CompanyLogo />
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{order.code || order.id}</h3>
                        <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                      </div>
                    </div>
                    <div
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColorClass}`}
                    >
                      <StatusIcon />
                      <span className="ml-1">{status}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Customer Info */}
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900">Cliente</p>
                      <p className="text-sm text-gray-600">{order.user?.name || "Cliente no registrado"}</p>
                    </div>
                  </div>

                  {/* Table Info */}
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900">Mesa</p>
                      <p className="text-sm text-gray-600">{order.space?.name || "No asignada"}</p>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-yellow-600" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900">Total</p>
                      <p className="text-lg font-bold text-gray-900">{formatCurrency(order.total)}</p>
                    </div>
                  </div>

                  {/* Order Items Count */}
                  {order.items && order.items.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600">
                        <Package className="w-4 h-4 inline mr-1" />
                        {order.items.length} {order.items.length === 1 ? "producto" : "productos"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Printer className="w-4 h-4 mr-1" />
                    Imprimir
                  </button>
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 transition-colors">
                    <Eye className="w-4 h-4 mr-1" />
                    Detalles
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default OrderList
