"use client"

import { useState, useEffect } from "react"
import { Plus, Minus, Trash2, X } from "lucide-react"
import type { Producto, ItemPedido, Mesa } from "../../../interface/onsine"

interface CrearPedidoModalProps {
  abierto: boolean
  onClose: () => void
  onGuardar: (mesa: Mesa) => void
  productos: Producto[]
  mesaInicial: Mesa | null
}

export default function CrearPedidoModal({
  abierto,
  onClose,
  onGuardar,
  productos,
  mesaInicial,
}: CrearPedidoModalProps) {
  const [numeroMesa, setNumeroMesa] = useState("")
  const [cliente, setCliente] = useState("")
  const [items, setItems] = useState<ItemPedido[]>([])
  const [activeTab, setActiveTab] = useState("comida")

  useEffect(() => {
    if (mesaInicial) {
      setNumeroMesa(mesaInicial.numero.toString())
      setCliente(mesaInicial.cliente)
      setItems(mesaInicial.items || [])
    } else {
      setNumeroMesa("")
      setCliente("")
      setItems([])
    }
  }, [mesaInicial, abierto])

  const agregarProducto = (producto: Producto) => {
    const itemExistente = items.find((item) => item.producto.id === producto.id)

    if (itemExistente) {
      setItems(
        items.map((item) => (item.producto.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item)),
      )
    } else {
      setItems([...items, { producto, cantidad: 1 }])
    }
  }

  const cambiarCantidad = (id: number, cantidad: number) => {
    if (cantidad <= 0) {
      setItems(items.filter((item) => item.producto.id !== id))
    } else {
      setItems(items.map((item) => (item.producto.id === id ? { ...item, cantidad } : item)))
    }
  }

  const eliminarItem = (id: number) => {
    setItems(items.filter((item) => item.producto.id !== id))
  }

  const calcularTotal = () => {
    return items.reduce((total, item) => total + item.producto.precio * item.cantidad, 0)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const guardarPedido = () => {
    if (!numeroMesa.trim()) {
      alert("Por favor ingresa un número de mesa")
      return
    }

    const nuevaMesa: Mesa = {
      id: mesaInicial?.id || 0,
      numero: Number.parseInt(numeroMesa),
      cliente: cliente,
      items: items,
      total: calcularTotal(),
      fecha: new Date().toISOString(),
    }

    onGuardar(nuevaMesa)
  }

  // Filtrar productos por categoría (asumiendo que tienen una propiedad categoría)
  const productosFiltrados = productos.filter(
    (producto) =>
      (activeTab === "comida" && producto.categoria?.toLowerCase() === "comida") ||
      (activeTab === "bebida" && producto.categoria?.toLowerCase() === "bebida") ||
      (!producto.categoria && activeTab === "comida"), // Si no hay categoría, mostrar en comida por defecto
  )

  if (!abierto) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-xl font-semibold">
            {mesaInicial ? `Editar Pedido - Mesa ${mesaInicial.numero}` : "Crear Nuevo Pedido"}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          {/* Left side - Form and Products */}
          <div className="md:w-1/2 p-4 flex flex-col overflow-hidden">
            {/* Form */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="numeroMesa" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Mesa
                </label>
                <input
                  id="numeroMesa"
                  type="number"
                  value={numeroMesa}
                  onChange={(e) => setNumeroMesa(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: 1"
                />
              </div>
              <div>
                <label htmlFor="cliente" className="block text-sm font-medium text-gray-700 mb-1">
                  Cliente
                </label>
                <input
                  id="cliente"
                  type="text"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nombre del cliente"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-4">
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === "comida"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("comida")}
              >
                Comida
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === "bebida"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("bebida")}
              >
                Bebidas
              </button>
            </div>

            {/* Products */}
            <div className="overflow-y-auto flex-1 pr-2">
              <div className="grid grid-cols-2 gap-3">
                {productosFiltrados.map((producto) => (
                  <div
                    key={producto.id}
                    className="border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => agregarProducto(producto)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{producto.nombre}</h4>
                        <p className="text-sm text-gray-500">{formatCurrency(producto.precio)}</p>
                      </div>
                      <button
                        className="bg-blue-100 text-blue-600 p-1 rounded-full hover:bg-blue-200 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          agregarProducto(producto)
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Order Summary */}
          <div className="md:w-1/2 border-t md:border-t-0 md:border-l bg-gray-50 flex flex-col">
            <div className="p-4 border-b bg-gray-100">
              <h3 className="font-medium">Resumen del Pedido</h3>
            </div>

            {/* Items */}
            <div className="overflow-y-auto flex-1 p-4">
              {items.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No hay productos seleccionados</div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.producto.id} className="flex items-center justify-between border-b pb-3">
                      <div className="flex-1">
                        <div className="font-medium">{item.producto.nombre}</div>
                        <div className="text-sm text-gray-500">
                          {formatCurrency(item.producto.precio)} x {item.cantidad}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                          onClick={() => cambiarCantidad(item.producto.id, item.cantidad - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.cantidad}</span>
                        <button
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                          onClick={() => cambiarCantidad(item.producto.id, item.cantidad + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 rounded-full text-red-500 hover:bg-red-100 transition-colors"
                          onClick={() => eliminarItem(item.producto.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total and Actions */}
            <div className="p-4 border-t mt-auto">
              <div className="flex justify-between font-medium text-lg mb-4">
                <span>Total:</span>
                <span>{formatCurrency(calcularTotal())}</span>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={guardarPedido}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {mesaInicial ? "Actualizar Pedido" : "Crear Pedido"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
