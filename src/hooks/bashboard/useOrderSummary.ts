import { useState } from "react"

interface OrderItem {
  id?: number
  name: string
  price: number
  quantity: number
  images?: Array<any>
}

export const useOrderSummary = (items: OrderItem[]) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null)

  const total = items.reduce((sum, item) => sum + Number(item.price ?? 0) * item.quantity, 0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
    }).format(price)
  }

  const toggleItem = (itemId: number) => {
    setExpandedItem(expandedItem === itemId ? null : itemId)
  }

  return {
    total,
    expandedItem,
    formatPrice,
    toggleItem
  }
}