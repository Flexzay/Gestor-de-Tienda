// pages/pedidos.tsx
import { useState } from "react"
import usePedidos from "../../hooks/bashboard/usePedido"
import ListaMesas from "../../components/dashboard/onsine/tableList"
import CrearPedidoModal from "../../components/dashboard/onsine/CreateOrderModal"

function PedidosPage() {
  const {
    mesas,
    mesaActual,
    productos,
    crearMesa,
    eliminarMesa,
    editarMesa,
    actualizarMesa,
  } = usePedidos()

  const [modalAbierto, setModalAbierto] = useState(false)

  return (
    <div className="container mx-auto py-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Sistema de Pedidos</h2>
          <button
            onClick={() => {
              setModalAbierto(true)
            }}
            className="bg-blue-500 text-white p-2 rounded-lg flex items-center"
          >
            Nuevo Pedido
          </button>
        </div>
        <ListaMesas mesas={mesas} onEliminar={eliminarMesa} onEditar={editarMesa} />
      </div>

      <CrearPedidoModal
        abierto={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onGuardar={mesaActual ? actualizarMesa : crearMesa}
        productos={productos}
        mesaInicial={mesaActual}
      />
    </div>
  )
}

export default PedidosPage
