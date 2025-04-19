import  { useEffect, useState } from "react";
import { membershipService } from "../../../Services/membership.service";
import { History } from "lucide-react";  

interface Compra {
  id: string;
  created_at: string;
  ducks: number;
  status: string;
}

export function HistorialCompras() {
  const [historialCompras, setHistorialCompras] = useState<Compra[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await membershipService.getHistoryCharges();
        if (response.status === 200) {
          setHistorialCompras(response.data.history || []); 
        } else {
          console.error("Error al cargar historial:", response.message);
        }
      } catch (error) {
        console.error("Error en la carga del historial:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistorial();
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center">
          <History className="h-6 w-6 text-amber-500 mr-2" />
          <h3 className="text-xl font-semibold text-gray-800">Historial de Compras</h3>
        </div>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Detalles de tus compras de créditos.</p>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Cantidad
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {historialCompras.map((compra) => (
              <tr key={compra.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <History className="mr-2 h-4 w-4 text-gray-400" />
                    <span>
                      {/* Convertir el formato de la fecha de created_at */}
                      {new Date(compra.created_at).toLocaleDateString("es-CO", {
                        year: "numeric", // 2024
                        month: "2-digit", // 11 (noviembre)
                        day: "2-digit",   // 08 (día con dos dígitos)
                      }) || "Fecha no disponible"}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">{compra.ducks} créditos</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                    {/* Cambiar el texto de estado */}
                    {compra.status === "accepted_company" ? "Aceptado" : compra.status || "Estado no disponible"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
