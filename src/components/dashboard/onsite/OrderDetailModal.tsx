"use client"

import type React from "react"
import { Dialog } from "@headlessui/react"
import { X, Package, User, MapPin, ShoppingBag, Clock } from "lucide-react"

interface OrderDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  order: any
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ isOpen, onClose, order }) => {
  if (!order) return null

  const formatCurrency = (amount: number) => {
    return `$${Number(amount).toLocaleString()}`
  }

  const totalItems = order.items?.reduce((sum: number, item: any) => sum + (item.amount || 1), 0) || 0

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
        <div className="fixed inset-0 bg-white bg-opacity-100 transition-opacity" aria-hidden="true" />

        <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-rose-600 to-rose-700 px-6 py-5">
            <div className="flex justify-between items-center">
              <Dialog.Title className="text-xl font-bold text-white flex items-center gap-3">
                <div className="bg-black bg-opacity-20 p-2 rounded-lg">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                Detalles del Pedido
              </Dialog.Title>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-white hover:bg-opacity-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            {/* Order Summary Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-6 border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Pedido</p>
                    <p className="text-lg font-bold text-blue-900">{order.code || order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-600">Total</p>
                  <p className="text-2xl font-bold text-blue-900">{formatCurrency(Number(order.total) || 0)}</p>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              {/* Customer */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <User className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium">Cliente</p>
                  <p className="text-gray-900 font-semibold">{order.user?.name || "Cliente no registrado"}</p>
                </div>
              </div>

              {/* Table */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="bg-purple-100 p-3 rounded-full">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium">Mesa</p>
                  <p className="text-gray-900 font-semibold">{order.space?.name || "No asignada"}</p>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-gray-600" />
                  Productos
                </h3>
                <div className="bg-slate-100 text-slate-700 text-sm font-semibold px-3 py-1 rounded-full">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </div>
              </div>

              {order.items?.length > 0 ? (
                <div className="space-y-4">
                  {order.items.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900 text-base">{item.name || "Producto"}</h4>
                        <div className="bg-gray-100 text-gray-700 text-sm font-medium px-2 py-1 rounded-lg">
                          × {item.amount || 1}
                        </div>
                      </div>

                      {item.observation && (
                        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Clock className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-amber-800">Observación</p>
                              <p className="text-sm text-amber-700">{item.observation}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 font-semibold text-lg">Sin productos</p>
                  <p className="text-sm text-gray-400 mt-1">Este pedido no contiene productos</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-cyan-600 hover:bg-cyan-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default OrderDetailsModal
