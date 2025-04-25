import { CreditosActuales } from "./duckPresent"
import { RecargarCreditos } from "./rechargeDuck"
import { Resumen } from "./summary"
import { HistorialCompras } from "./record"
import Sidebar from "../Sidebar"
import { useMembership } from "../../../hooks/bashboard/useMenbershi"

export default function MembershipComponents() {
  const {
    creditos,
    setCreditos,
    creditosSeleccionados,
    setCreditosSeleccionados,
    historialCompras,
    isLoadingHistorial,
    handleRecargar,
  } = useMembership()

  const handleRefreshCreditos = (newCreditos: number) => {
    setCreditos(newCreditos)
  }

  return (
    <>
      <Sidebar />
      <main className="md:ml-72 p-4 md:p-8 bg-gray-100 min-h-screen">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 pl-14 md:pl-0">
            Panel de Créditos
          </h1>
        </div>

        <div className="space-y-8">
          <CreditosActuales 
            creditos={creditos} 
            onRefresh={handleRefreshCreditos} 
          />
          
          <RecargarCreditos
            creditosSeleccionados={creditosSeleccionados}
            setCreditosSeleccionados={setCreditosSeleccionados}
            onRecargar={handleRecargar}
          />
          
          <Resumen creditosSeleccionados={creditosSeleccionados} />

          {isLoadingHistorial ? (
            <p className="text-gray-500">Cargando historial...</p>
          ) : (
            <HistorialCompras historialCompras={historialCompras} />
          )}
        </div>
      </main>
    </>
  )
}