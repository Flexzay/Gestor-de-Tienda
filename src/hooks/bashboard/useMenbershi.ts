import { useEffect, useState } from "react";
import { membershipService } from "../../Services/membership.service";
import { Compra } from "../../interface/membership";

export function useMembership() {
  const [creditos, setCreditos] = useState(0);
  const [creditosSeleccionados, setCreditosSeleccionados] = useState(50000);
  const [historialCompras, setHistorialCompras] = useState<Compra[]>([]);
  const [isLoadingHistorial, setIsLoadingHistorial] = useState(true);

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

  const handleRecargar = async (comprobante: File | null) => {
    if (!comprobante) {
      alert("Debes subir un comprobante antes de recargar.");
      return;
    }

    const formData = new FormData();
    formData.append("amount", creditosSeleccionados.toString());
    formData.append("receipt", comprobante); // ajusta según backend

    try {
      await membershipService.buyDucks(formData);
      alert("Recarga enviada. Será revisada por un administrador.");
      setCreditos((prev) => prev + creditosSeleccionados); // opcional, hasta que backend actualice
      fetchHistorial(); // refrescar historial
    } catch (error: any) {
      alert("Tu recarga fue enviada. Podés verificar luego en el historial.");
    }
  };

  useEffect(() => {
    fetchHistorial();
  }, []);

  return {
    creditos,
    setCreditos,
    creditosSeleccionados,
    setCreditosSeleccionados,
    historialCompras,
    isLoadingHistorial,
    handleRecargar,
  };
}
