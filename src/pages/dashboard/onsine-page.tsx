
import { useState } from "react"
import usePedidos from "../../hooks/bashboard/useOnsite"
import ListaMesas from "../../components/dashboard/onsine/tableList"
import CrearPedidoModal from "../../components/dashboard/onsine/CreateOrderModal"
import { PlusCircle } from "lucide-react"

export function PedidosPage() {
  const { mesas, mesaActual, productos, crearMesa, eliminarMesa, editarMesa, actualizarMesa } = usePedidos()

  const [modalAbierto, setModalAbierto] = useState(false)

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-rose-600 to-rose-700 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Sistema de Pedidos</h2>
              <p className="text-blue-100 mt-1">Gestiona tus pedidos en sitio de forma eficiente</p>
            </div>
            <button
              onClick={() => setModalAbierto(true)}
              className="bg-white text-rose-600 px-4 py-2 rounded-lg shadow hover:shadow-lg transition-all flex items-center gap-2 font-medium"
            >
              <PlusCircle className="h-5 w-5" />
              Nuevo Pedido
            </button>
          </div>
        </div>

        <div className="p-6">
          <ListaMesas
            mesas={mesas}
            onEliminar={eliminarMesa}
            onEditar={(mesa) => {
              editarMesa(mesa)
              setModalAbierto(true)
            }}
          />
        </div>
      </div>

      <CrearPedidoModal
        abierto={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onGuardar={(mesa) => {
          if (mesaActual) {
            actualizarMesa(mesa)
          } else {
            crearMesa(mesa)
          }
          setModalAbierto(false)
        }}
        productos={productos}
        mesaInicial={mesaActual}
      />
    </div>
  )
}

export default PedidosPage
