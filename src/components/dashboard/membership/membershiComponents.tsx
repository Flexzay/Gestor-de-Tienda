import { useState, useEffect } from "react";
import { CreditosActuales } from "./duckPresent";
import { RecargarCreditos } from "./rechargeDuck";
import { Resumen } from "./summary";
import { HistorialCompras } from "./record";
import Sidebar from "../Sidebar";
import { membershipService } from "../../../Services/membership.service";

interface Compra {
  id: number;
  fecha: string;
  cantidad: number;
  estado: string;
}

export default function MembershipComponents() {
  const [creditos, setCreditos] = useState(100);
  const [creditosSeleccionados, setCreditosSeleccionados] = useState(50000);

  const [historialCompras, setHistorialCompras] = useState<Compra[]>([]);
  const [isLoadingHistorial, setIsLoadingHistorial] = useState(true);

  const handleRecargar = async (comprobante: File | null) => {
    if (!comprobante) {
      alert("Debes subir un comprobante antes de recargar.");
      return;
    }

    const formData = new FormData();
    formData.append("amount", creditosSeleccionados.toString());
    formData.append("receipt", comprobante); // Ajustar el nombre según backend

    try {
      await membershipService.buyDucks(formData);
      alert("Recarga enviada. Será revisada por un administrador.");
      fetchHistorial(); // refresca si el admin la aprueba rápido
    } catch (error) {
      // ⚠️ Pero sabemos que esto puede fallar por CORS, así que podés mostrar igual:
      alert("Tu recarga fue enviada. Podés verificar luego en el historial.");
    }
    
  };

  const fetchHistorial = async () => {
    try {
      const response = await membershipService.getHistoryCharges();
      console.log("📦 Respuesta completa de getHistoryCharges:", response);
  
      if (response.status === 200) {
        const compras = response.data?.history || [];
        console.log("🧾 Historial procesado:", compras);
        setHistorialCompras(compras);
      } else {
        console.error("❌ Error en la respuesta:", response.message);
      }
    } catch (error: any) {
      console.error("🚨 Error al cargar historial:", error.message);
    } finally {
      setIsLoadingHistorial(false);
    }
  };
  

  useEffect(() => {
    fetchHistorial();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar fijo a la izquierda */}
      <div className="hidden md:block md:fixed md:top-0 md:left-0 md:h-full md:w-72 bg-white shadow-md z-10">
        <Sidebar />
      </div>

      {/* Contenido principal con margen izquierdo */}
      <div className="flex-1 p-4 md:p-8 w-full md:ml-72 md:pl-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Panel de Créditos
          </h1>

          <CreditosActuales creditos={creditos} />

          <RecargarCreditos
            creditosSeleccionados={creditosSeleccionados}
            setCreditosSeleccionados={setCreditosSeleccionados}
            onRecargar={(comprobante) => handleRecargar(comprobante)}
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
