import { CreditosActuales } from "./duckPresent";
import { RecargarCreditos } from "./rechargeDuck";
import { Resumen } from "./summary";
import { HistorialCompras } from "./record";
import Sidebar from "../Sidebar";
import { useMembership } from "../../../hooks/bashboard/useMenbershi";

export default function MembershipComponents() {
  const {
    creditos,
    creditosSeleccionados,
    setCreditosSeleccionados,
    historialCompras,
    isLoadingHistorial,
    handleRecargar,
  } = useMembership();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="hidden md:block md:fixed md:top-0 md:left-0 md:h-full md:w-72 bg-white shadow-md z-10">
        <Sidebar />
      </div>

      <div className="flex-1 p-4 md:p-8 w-full md:ml-72 md:pl-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Panel de Créditos
          </h1>

          <CreditosActuales creditos={creditos} />

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
      </div>
    </div>
  );
}
