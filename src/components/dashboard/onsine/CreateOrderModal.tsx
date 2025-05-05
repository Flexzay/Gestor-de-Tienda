// components/CrearPedidoModal.tsx
import { useState, useEffect } from "react"
import { Plus, Minus } from "lucide-react"
import { Producto, ItemPedido, Mesa } from "../../../interface/onsine"

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
        items.map((item) =>
          item.producto.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
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

  const calcularTotal = () => {
    return items.reduce((total, item) => total + item.producto.precio * item.cantidad, 0)
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

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 ${
        abierto ? "block" : "hidden"
      }`}
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold mb-4">{mesaInicial ? `Editar Pedido - Mesa ${mesaInicial.numero}` : "Crear Nuevo Pedido"}</h3>
        {/* Aquí sigue la lógica de formulario y productos */}
        <div className="space-y-2">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="flex justify-between items-center"
            >
              <span>{producto.nombre}</span>
              <button
                onClick={() => agregarProducto(producto)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <span>Total:</span>
          <span>{calcularTotal()}€</span>
        </div>
        <div className="mt-4 flex gap-4">
          <button onClick={onClose} className="bg-gray-300 p-2 rounded-lg">
            Cancelar
          </button>
          <button onClick={guardarPedido} className="bg-blue-500 text-white p-2 rounded-lg">
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}
