import { useState } from "react"
import { CreditosActuales } from "./duckPresent"
import { RecargarCreditos } from "./rechargeDuck"
import { Resumen } from "./summary"
import { HistorialCompras } from "./record"
import Sidebar from "../Sidebar"

export default function MembershipComponents() {
  const [creditos, setCreditos] = useState(100)
  const [creditosSeleccionados, setCreditosSeleccionados] = useState(50)

  // Datos de ejemplo del historial de compras
  const historialCompras = [
    { id: 1, fecha: "01/04/2023", cantidad: 100, estado: "Completado" },
    { id: 2, fecha: "15/03/2023", cantidad: 50, estado: "Completado" },
    { id: 3, fecha: "28/02/2023", cantidad: 200, estado: "Completado" },
  ]

  const handleRecargar = () => {
    setCreditos(creditos + creditosSeleccionados)
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 w-full">
        <div className="mx-auto max-w-6xl space-y-8">
          <h1 className="text-2xl pl-14 md:pl-0 font-bold text-gray-900 md:text-3xl">
            Panel de Créditos
          </h1>



          <CreditosActuales creditos={creditos} />

          <RecargarCreditos
            creditosSeleccionados={creditosSeleccionados}
            setCreditosSeleccionados={setCreditosSeleccionados}
            onRecargar={handleRecargar}
          />

          <Resumen creditosSeleccionados={creditosSeleccionados} />

          <HistorialCompras historialCompras={historialCompras} />
        </div>
      </div>
    </div >
  )
}

