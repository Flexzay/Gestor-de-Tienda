import React, { useState, useEffect } from "react"
import ClientSearchForm from "./formOnsite"
import SelectTable from "./selectTable"
import SelectProduct from "./selectProduct"
import OrderSummary from "./OrderSumary"
import OrderConfirmation from "./OrderConfirmation"
import { storageService } from "../../../Services/storage.service"
import { orderService } from "../../../Services/order.service"
import { ProductFormData } from "../../../interface/product"
import type { Table } from "../../../interface/table"

interface OrderItem extends ProductFormData {
  quantity: number
}

const Onsite: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null)
  const [clientData, setClientData] = useState<{ name: string; phone?: string } | null>(null)
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [shopId, setShopId] = useState<string | null>(null)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const id = storageService.getShopId()
    setShopId(id)
  }, [])

  const handleAddProduct = (product: ProductFormData) => {
    setOrderItems((prev) => {
      const existing = prev.find((p) => p.id === product.id)
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })
  }

  const handleUpdateQuantity = (productId: number, qty: number) => {
    setOrderItems((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, quantity: qty } : p))
    )
  }

  const handleRemoveProduct = (productId: number) => {
    setOrderItems((prev) => prev.filter((p) => p.id !== productId))
  }

  const handleConfirmOrder = async () => {
    if (!userId || !selectedTable || orderItems.length === 0 || !shopId) {
      setError("Faltan datos para confirmar el pedido")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const orderData = {
        client_id: userId,
        space_id: selectedTable.id,
        products: orderItems.map((item) => ({
          id: item.id,
          amount: item.quantity,
          price: item.price,
          observation: null,
        })),
      }

      const response = await orderService.createOnsiteOrder(orderData)

      // Soportar diferentes estructuras posibles
      const rawData = response?.data || {}
      const billId =
        rawData.id ??
        rawData.bill?.id ??
        rawData.bill // fallback por si viene como número directo

      if (!billId) {
        console.warn("Respuesta inesperada del backend:", rawData)
        throw new Error("La respuesta del servidor no incluye el ID de la orden.")
      }

      setCurrentOrder({
        id: billId.toString(),
        client: clientData || { name: "Sin nombre" },
        space: { name: selectedTable.name },
        status: rawData.state?.label || "Pendiente",
        createdAt: rawData.created_at || new Date().toISOString(),
        orderDetails: orderItems.map((item) => ({
          id: item.id!,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      })

      setOrderConfirmed(true)
    } catch (err: any) {
      console.error("Error al procesar el pedido:", err)
      setError(err.message || "Error al procesar el pedido.")
    } finally {
      setLoading(false)
    }
  }

  const handleNewOrder = () => {
    setUserId(null)
    setClientData(null)
    setSelectedTable(null)
    setOrderItems([])
    setOrderConfirmed(false)
    setCurrentOrder(null)
    setError(null)
  }

  if (!shopId) {
    return <div className="text-red-500 p-4">No se identificó la tienda.</div>
  }

  if (orderConfirmed && currentOrder) {
    return <OrderConfirmation order={currentOrder} onNewOrder={handleNewOrder} />
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <ClientSearchForm
        onUserFound={(id, data) => {
          setUserId(id)
          setClientData(data)
        }}
      />

      {userId && (
        <>
          <SelectTable
            shopId={shopId}
            onSelect={setSelectedTable}
            selectedTableId={selectedTable?.id}
          />

          {selectedTable && (
            <>
              <SelectProduct onAddProduct={handleAddProduct} />

              <OrderSummary
                items={orderItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveProduct}
              />

              {orderItems.length > 0 && (
                <div className="text-right space-y-4">
                  {error && <div className="text-red-500 text-center">{error}</div>}
                  <button
                    className="mt-4 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
                    onClick={handleConfirmOrder}
                    disabled={loading}
                  >
                    {loading ? "Procesando..." : "Confirmar Pedido"}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Onsite
