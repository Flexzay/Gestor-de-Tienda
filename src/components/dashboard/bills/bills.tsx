import type React from "react"
import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Download,
  Eye,
  FileText,
  Search,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import type Invoice from "../../../interface/bills"
import type { InvoiceItem, Client } from "../../../interface/bills"

export function Bills() {
  // Estado para la lista de facturas
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 1,
      invoiceNumber: "INV-001",
      client: {
        id: 1,
        name: "Empresa ABC",
        email: "contacto@empresaabc.com",
        address: "Calle Principal 123, Ciudad",
        phone: "123-456-7890",
      },
      items: [
        { id: 1, description: "Servicio de consultoría", quantity: 10, unitPrice: 100, total: 1000 },
        { id: 2, description: "Desarrollo de software", quantity: 1, unitPrice: 2000, total: 2000 },
      ],
      subtotal: 3000,
      tax: 570,
      total: 3570,
      status: "paid",
      issueDate: "2023-05-01",
      dueDate: "2023-05-15",
      notes: "Pago recibido a tiempo",
    },
    {
      id: 2,
      invoiceNumber: "INV-002",
      client: {
        id: 2,
        name: "Corporación XYZ",
        email: "finanzas@xyz.com",
        address: "Avenida Central 456, Ciudad",
        phone: "987-654-3210",
      },
      items: [{ id: 1, description: "Mantenimiento mensual", quantity: 1, unitPrice: 500, total: 500 }],
      subtotal: 500,
      tax: 95,
      total: 595,
      status: "pending",
      issueDate: "2023-05-10",
      dueDate: "2023-05-25",
      notes: "Factura enviada por correo electrónico",
    },
  ])

  // Estado para el formulario de factura
  const [showForm, setShowForm] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(invoices)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<string>("issueDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Estado para el formulario de factura
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    clientId: "",
    issueDate: "",
    dueDate: "",
    notes: "",
    taxRate: "19",
  })

  // Estado para los clientes
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: "Empresa ABC",
      email: "contacto@empresaabc.com",
      address: "Calle Principal 123, Ciudad",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Corporación XYZ",
      email: "finanzas@xyz.com",
      address: "Avenida Central 456, Ciudad",
      phone: "987-654-3210",
    },
  ])

  // Estado para los items de la factura
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { id: 1, description: "", quantity: 1, unitPrice: 0, total: 0 },
  ])

  // Efecto para filtrar facturas
  useEffect(() => {
    let result = invoices

    // Filtrar por término de búsqueda
    if (searchTerm) {
      result = result.filter(
        (invoice) =>
          invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.client.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrar por estado
    if (statusFilter !== "all") {
      result = result.filter((invoice) => invoice.status === statusFilter)
    }

    // Ordenar
    result = [...result].sort((a, b) => {
      if (sortField === "total") {
        return sortDirection === "asc" ? a.total - b.total : b.total - a.total
      } else if (sortField === "issueDate") {
        return sortDirection === "asc"
          ? new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime()
          : new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
      } else if (sortField === "dueDate") {
        return sortDirection === "asc"
          ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
      }
      return 0
    })

    setFilteredInvoices(result)
  }, [invoices, searchTerm, statusFilter, sortField, sortDirection])

  // Función para calcular el total de un item
  const calculateItemTotal = (item: InvoiceItem) => {
    return item.quantity * item.unitPrice
  }

  // Función para calcular el subtotal de la factura
  const calculateSubtotal = () => {
    return invoiceItems.reduce((sum, item) => sum + calculateItemTotal(item), 0)
  }

  // Función para calcular el impuesto
  const calculateTax = () => {
    const taxRate = Number.parseFloat(formData.taxRate) / 100
    return calculateSubtotal() * taxRate
  }

  // Función para calcular el total de la factura
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  // Función para manejar cambios en los items
  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...invoiceItems]

    if (field === "quantity" || field === "unitPrice") {
      newItems[index][field] = typeof value === "string" ? Number.parseFloat(value) || 0 : value
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice
    } else {
      // @ts-ignore - Esto es seguro porque sabemos que 'description' es una cadena
      newItems[index][field] = value
    }

    setInvoiceItems(newItems)
  }

  // Función para añadir un nuevo item
  const addInvoiceItem = () => {
    setInvoiceItems([...invoiceItems, { id: Date.now(), description: "", quantity: 1, unitPrice: 0, total: 0 }])
  }

  // Función para eliminar un item
  const removeInvoiceItem = (index: number) => {
    if (invoiceItems.length > 1) {
      const newItems = [...invoiceItems]
      newItems.splice(index, 1)
      setInvoiceItems(newItems)
    }
  }

  // Función para manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Función para iniciar la edición de una factura
  const editInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice)
    setFormData({
      invoiceNumber: invoice.invoiceNumber,
      clientId: invoice.client.id.toString(),
      issueDate: invoice.issueDate,
      dueDate: invoice.dueDate,
      notes: invoice.notes || "",
      taxRate: ((invoice.tax / invoice.subtotal) * 100).toFixed(0),
    })
    setInvoiceItems(invoice.items)
    setShowForm(true)
  }

  // Función para ver los detalles de una factura
  const viewInvoice = (invoice: Invoice) => {
    setViewingInvoice(invoice)
  }

  // Función para eliminar una factura
  const deleteInvoice = (id: number) => {
    setInvoices(invoices.filter((invoice) => invoice.id !== id))
  }

  // Función para cambiar el estado de una factura
  const changeInvoiceStatus = (id: number, status: "paid" | "pending" | "overdue") => {
    setInvoices(invoices.map((invoice) => (invoice.id === id ? { ...invoice, status } : invoice)))
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const selectedClient = clients.find((client) => client.id.toString() === formData.clientId)

    if (!selectedClient) {
      alert("Por favor seleccione un cliente válido")
      return
    }

    const subtotal = calculateSubtotal()
    const tax = calculateTax()
    const total = calculateTotal()

    const newInvoice: Invoice = {
      id: editingInvoice ? editingInvoice.id : Date.now(),
      invoiceNumber: formData.invoiceNumber,
      client: selectedClient,
      items: invoiceItems.map((item) => ({
        ...item,
        total: calculateItemTotal(item),
      })),
      subtotal,
      tax,
      total,
      status: editingInvoice ? editingInvoice.status : "pending",
      issueDate: formData.issueDate,
      dueDate: formData.dueDate,
      notes: formData.notes,
    }

    if (editingInvoice) {
      setInvoices(invoices.map((invoice) => (invoice.id === editingInvoice.id ? newInvoice : invoice)))
    } else {
      setInvoices([...invoices, newInvoice])
    }

    // Resetear el formulario
    setFormData({
      invoiceNumber: "",
      clientId: "",
      issueDate: "",
      dueDate: "",
      notes: "",
      taxRate: "19",
    })
    setInvoiceItems([{ id: 1, description: "", quantity: 1, unitPrice: 0, total: 0 }])
    setEditingInvoice(null)
    setShowForm(false)
  }

  // Función para generar un número de factura
  const generateInvoiceNumber = () => {
    const prefix = "INV-"
    const lastInvoice = invoices.reduce((max, invoice) => {
      const num = Number.parseInt(invoice.invoiceNumber.replace(prefix, ""))
      return num > max ? num : max
    }, 0)

    const newNumber = (lastInvoice + 1).toString().padStart(3, "0")
    return `${prefix}${newNumber}`
  }

  // Función para iniciar una nueva factura
  const startNewInvoice = () => {
    setEditingInvoice(null)
    setFormData({
      invoiceNumber: generateInvoiceNumber(),
      clientId: "",
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      notes: "",
      taxRate: "19",
    })
    setInvoiceItems([{ id: 1, description: "", quantity: 1, unitPrice: 0, total: 0 }])
    setShowForm(true)
  }

  // Función para simular la descarga de una factura
  const downloadInvoice = (invoice: Invoice) => {
    alert(`Descargando factura ${invoice.invoiceNumber} en formato PDF`)
    // Aquí iría la lógica para generar y descargar el PDF
  }

  // Renderizado condicional para el formulario o la lista de facturas
  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/dashboard"
          className="flex items-center text-gray-600 hover:text-[#ff204e] transition-colors duration-300"
        >
          <ArrowLeft size={24} className="mr-2" />
          <span className="font-medium">Volver al Dashboard</span>
        </Link>
      </div>

      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Facturas y Recibos</h2>

      {viewingInvoice ? (
        // Vista detallada de la factura
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Factura #{viewingInvoice.invoiceNumber}</h3>
            <button onClick={() => setViewingInvoice(null)} className="text-gray-500 hover:text-[#ff204e]">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-700">Información de la Empresa</h4>
              <p className="text-gray-600">Tu Empresa S.A.</p>
              <p className="text-gray-600">Dirección de la Empresa</p>
              <p className="text-gray-600">Ciudad, País</p>
              <p className="text-gray-600">info@tuempresa.com</p>
              <p className="text-gray-600">+123 456 7890</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-700">Cliente</h4>
              <p className="text-gray-600">{viewingInvoice.client.name}</p>
              <p className="text-gray-600">{viewingInvoice.client.address}</p>
              <p className="text-gray-600">{viewingInvoice.client.email}</p>
              <p className="text-gray-600">{viewingInvoice.client.phone}</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-gray-600">
                  Fecha de Emisión: <span className="font-semibold">{viewingInvoice.issueDate}</span>
                </p>
                <p className="text-gray-600">
                  Fecha de Vencimiento: <span className="font-semibold">{viewingInvoice.dueDate}</span>
                </p>
              </div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    viewingInvoice.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : viewingInvoice.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {viewingInvoice.status === "paid"
                    ? "Pagada"
                    : viewingInvoice.status === "pending"
                      ? "Pendiente"
                      : "Vencida"}
                </span>
              </div>
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200 mb-8">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Descripción
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cantidad
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Precio Unitario
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {viewingInvoice.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    ${item.unitPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    ${item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${viewingInvoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">
                  Impuesto ({((viewingInvoice.tax / viewingInvoice.subtotal) * 100).toFixed(0)}%):
                </span>
                <span className="font-semibold">${viewingInvoice.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 text-lg font-bold">
                <span>Total:</span>
                <span>${viewingInvoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {viewingInvoice.notes && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-2 text-gray-700">Notas</h4>
              <p className="text-gray-600">{viewingInvoice.notes}</p>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => downloadInvoice(viewingInvoice)}
              className="px-6 py-3 bg-[#ff204e] text-white rounded-lg hover:bg-[#ff3b60] transition-colors duration-300 flex items-center justify-center shadow-sm"
            >
              <Download size={20} className="mr-2" />
              Descargar PDF
            </button>
            <button
              onClick={() => {
                setViewingInvoice(null)
                editInvoice(viewingInvoice)
              }}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center shadow-sm"
            >
              <Edit2 size={20} className="mr-2" />
              Editar
            </button>
          </div>
        </div>
      ) : showForm ? (
        // Formulario para crear/editar factura
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              {editingInvoice ? "Editar Factura" : "Nueva Factura"}
            </h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 hover:text-[#ff204e]">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Número de Factura
              </label>
              <input
                id="invoiceNumber"
                name="invoiceNumber"
                type="text"
                value={formData.invoiceNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                required
              />
            </div>
            <div>
              <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
                Cliente
              </label>
              <select
                id="clientId"
                name="clientId"
                value={formData.clientId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                required
              >
                <option value="">Seleccione un cliente</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Emisión
              </label>
              <input
                id="issueDate"
                name="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                required
              />
            </div>
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Vencimiento
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4 text-gray-700">Productos/Servicios</h4>
            <table className="min-w-full divide-y divide-gray-200 mb-4">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Descripción
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cantidad
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Precio Unitario
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoiceItems.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, "description", e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                        placeholder="Descripción del producto o servicio"
                        required
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e] text-right"
                        required
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e] text-right"
                        required
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      ${calculateItemTotal(item).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        type="button"
                        onClick={() => removeInvoiceItem(index)}
                        className="text-red-600 hover:text-red-900"
                        disabled={invoiceItems.length === 1}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={addInvoiceItem}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center shadow-sm"
            >
              <Plus size={18} className="mr-2" />
              Añadir Producto/Servicio
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notas
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
              ></textarea>
            </div>
            <div>
              <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700 mb-1">
                Tasa de Impuesto (%)
              </label>
              <input
                id="taxRate"
                name="taxRate"
                type="number"
                min="0"
                max="100"
                value={formData.taxRate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                required
              />
            </div>
          </div>

          <div className="flex justify-end mb-6">
            <div className="w-64">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Impuesto ({formData.taxRate}%):</span>
                <span className="font-semibold">${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 text-lg font-bold">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="px-6 py-3 bg-[#ff204e] text-white rounded-lg hover:bg-[#ff3b60] transition-colors duration-300 flex items-center justify-center shadow-sm"
            >
              <Plus size={20} className="mr-2" />
              {editingInvoice ? "Actualizar Factura" : "Crear Factura"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center shadow-sm"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        // Lista de facturas
        <>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
            <button
              onClick={startNewInvoice}
              className="px-6 py-3 bg-[#ff204e] text-white rounded-lg hover:bg-[#ff3b60] transition-colors duration-300 flex items-center justify-center shadow-sm"
            >
              <Plus size={20} className="mr-2" />
              Nueva Factura
            </button>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Buscar facturas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-md ${statusFilter === "all" ? "bg-[#ff204e] text-white" : "bg-gray-200 text-gray-800"}`}
            >
              Todas
            </button>
            <button
              onClick={() => setStatusFilter("paid")}
              className={`px-4 py-2 rounded-md ${statusFilter === "paid" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"}`}
            >
              Pagadas
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-4 py-2 rounded-md ${statusFilter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-800"}`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setStatusFilter("overdue")}
              className={`px-4 py-2 rounded-md ${statusFilter === "overdue" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"}`}
            >
              Vencidas
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Factura
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cliente
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => {
                      if (sortField === "issueDate") {
                        setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                      } else {
                        setSortField("issueDate")
                        setSortDirection("desc")
                      }
                    }}
                  >
                    <div className="flex items-center">
                      Fecha de Emisión
                      {sortField === "issueDate" &&
                        (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => {
                      if (sortField === "dueDate") {
                        setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                      } else {
                        setSortField("dueDate")
                        setSortDirection("desc")
                      }
                    }}
                  >
                    <div className="flex items-center">
                      Fecha de Vencimiento
                      {sortField === "dueDate" &&
                        (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => {
                      if (sortField === "total") {
                        setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                      } else {
                        setSortField("total")
                        setSortDirection("desc")
                      }
                    }}
                  >
                    <div className="flex items-center">
                      Total
                      {sortField === "total" &&
                        (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Estado
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredInvoices.map((invoice) => (
                    <motion.tr
                      key={invoice.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText size={20} className="text-[#ff204e] mr-2" />
                          <span className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.client.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.issueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${invoice.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            invoice.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : invoice.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {invoice.status === "paid"
                            ? "Pagada"
                            : invoice.status === "pending"
                              ? "Pendiente"
                              : "Vencida"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => viewInvoice(invoice)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Eye size={18} />
                          </button>
                          <button onClick={() => editInvoice(invoice)} className="text-blue-600 hover:text-blue-900">
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => downloadInvoice(invoice)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Download size={18} />
                          </button>
                          <button onClick={() => deleteInvoice(invoice.id)} className="text-red-600 hover:text-red-900">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default Bills

