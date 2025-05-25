import React from "react"
import { Trash2, Minus, Plus, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react"
import { useOrderSummary } from "../../../hooks/bashboard/useOrderSummary"
import type { ProductFormData } from "../../../interface/product"

interface OrderItem extends ProductFormData {
  quantity: number
  price: number
}

interface OrderSummaryProps {
  items: OrderItem[]
  onUpdateQuantity: (productId: number, quantity: number) => void
  onRemove: (productId: number) => void
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, onUpdateQuantity, onRemove }) => {
  const { total, expandedItem, formatPrice, toggleItem } = useOrderSummary(items)

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Resumen del Pedido</h3>
          <p className="text-sm text-gray-500 mt-1">
            {items.length} {items.length === 1 ? "producto" : "productos"} en el pedido
          </p>
        </div>
        {items.length > 0 && <div className="text-lg font-bold text-blue-600">{formatPrice(total)}</div>}
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <ShoppingCart className="h-12 w-12 text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Tu pedido está vacío</h3>
          <p className="text-gray-500 max-w-md">Agrega productos desde el catálogo para comenzar a crear tu pedido.</p>
        </div>
      ) : (
        <>
          {/* Desktop view - Table */}
          <div className="hidden md:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Producto
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Precio
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cantidad
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Subtotal
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map(
                  (item) =>
                    item.id !== undefined && (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {item.images?.[0] && typeof item.images[0] === "object" ? (
                              <img
                                src={(item.images[0] as any).url || "/placeholder.svg"}
                                alt={item.name}
                                className="h-10 w-10 rounded-md object-cover mr-3"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center mr-3">
                                <ShoppingCart className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                          {formatPrice(item.price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center">
                            <button
                              className="p-1 rounded-l-md bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors border border-gray-300"
                              onClick={() => onUpdateQuantity(item.id!, Math.max(1, item.quantity - 1))}
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <div className="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-700 min-w-[40px] text-center">
                              {item.quantity}
                            </div>
                            <button
                              className="p-1 rounded-r-md bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors border border-gray-300"
                              onClick={() => onUpdateQuantity(item.id!, item.quantity + 1)}
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => onRemove(item.id!)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ),
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile view - List */}
          <div className="md:hidden divide-y divide-gray-200">
            {items.map(
              (item) =>
                item.id !== undefined && (
                  <div key={item.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        {item.images?.[0] && typeof item.images[0] === "object" ? (
                          <img
                            src={(item.images[0] as any).url || "/placeholder.svg"}
                            alt={item.name}
                            className="h-12 w-12 rounded-md object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                            <ShoppingCart className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{formatPrice(item.price)}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleItem(item.id!)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        aria-label={expandedItem === item.id ? "Colapsar" : "Expandir"}
                      >
                        {expandedItem === item.id ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Expanded content */}
                    <div className={`mt-3 ${expandedItem === item.id ? "block" : "hidden"}`}>
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-sm text-gray-500">Cantidad</div>
                        <div className="flex items-center">
                          <button
                            className="p-1 rounded-l-md bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors border border-gray-300"
                            onClick={() => onUpdateQuantity(item.id!, Math.max(1, item.quantity - 1))}
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-700 min-w-[40px] text-center">
                            {item.quantity}
                          </div>
                          <button
                            className="p-1 rounded-r-md bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors border border-gray-300"
                            onClick={() => onUpdateQuantity(item.id!, item.quantity + 1)}
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-3">
                        <div className="text-sm text-gray-500">Subtotal</div>
                        <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                      </div>

                      <button
                        onClick={() => onRemove(item.id!)}
                        className="w-full mt-2 flex items-center justify-center py-2 px-4 border border-red-300 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                ),
            )}
          </div>

          {/* Footer with total */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-gray-500">Subtotal</div>
              <div className="text-sm font-medium text-gray-900">{formatPrice(total)}</div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-base font-medium text-gray-900">Total</div>
              <div className="text-lg font-bold text-blue-600">{formatPrice(total)}</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default OrderSummary