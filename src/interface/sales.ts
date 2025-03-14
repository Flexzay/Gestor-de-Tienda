import type { Client } from "./invoice"
import type Product from "./product"

export interface CartItem {
  id: number
  product: Product
  quantity: number
  unitPrice: number
  discount: number
  total: number
}

export interface Sale {
  id: number
  saleNumber: string
  client: Client
  items: CartItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  paymentMethod: string
  paymentStatus: "paid" | "pending" | "partial"
  date: string
  seller: string
  notes?: string
  invoiceGenerated: boolean
}

export default Sale

