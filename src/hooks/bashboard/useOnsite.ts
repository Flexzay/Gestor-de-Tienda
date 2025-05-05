import { useState } from "react"
import { Mesa, Producto } from "../../interface/onsine"

export default function usePedidos() {
  const [mesas, setMesas] = useState<Mesa[]>([])
  const [mesaActual, setMesaActual] = useState<Mesa | null>(null)

  const productosIniciales: Producto[] = [
    { id: 1, nombre: "Hamburguesa", precio: 8.99, categoria: "Comida" },
    { id: 2, nombre: "Pizza", precio: 10.99, categoria: "Comida" },
    { id: 3, nombre: "Refresco", precio: 2.5, categoria: "Bebida" },
    { id: 4, nombre: "Cerveza", precio: 3.5, categoria: "Bebida" },
    { id: 5, nombre: "Ensalada", precio: 6.99, categoria: "Comida" },
    { id: 6, nombre: "Agua", precio: 1.5, categoria: "Bebida" },
  ]

  const crearMesa = (nuevaMesa: Mesa) => {
    setMesas([...mesas, { ...nuevaMesa, id: Date.now() }])
  }

  const eliminarMesa = (id: number) => {
    setMesas(mesas.filter((mesa) => mesa.id !== id))
  }

  const editarMesa = (mesa: Mesa) => {
    setMesaActual(mesa)
  }

  const actualizarMesa = (mesaActualizada: Mesa) => {
    setMesas(mesas.map((mesa) => (mesa.id === mesaActualizada.id ? mesaActualizada : mesa)))
    setMesaActual(null)
  }

  return {
    mesas,
    mesaActual,
    productos: productosIniciales,
    crearMesa,
    eliminarMesa,
    editarMesa,
    actualizarMesa,
  }
}
