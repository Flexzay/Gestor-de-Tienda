export interface InvoiceItem {
    id: number
    description: string
    quantity: number
    unitPrice: number
    total: number
}

export interface Client {
    id: number
    name: string
    email: string
    address: string
    phone: string
}

export interface Invoice {
    id: number
    invoiceNumber: string
    client: Client
    items: InvoiceItem[]
    subtotal: number
    tax: number
    total: number
    status: "paid" | "pending" | "overdue"
    issueDate: string
    dueDate: string
    notes?: string
}

export default Invoice

