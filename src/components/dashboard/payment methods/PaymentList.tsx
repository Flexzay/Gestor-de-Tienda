import type React from "react";
import { Edit2, Trash2, Check } from "lucide-react";
import type { PaymentMethod } from "../../../interface/paymentMethod";

interface PaymentListProps {
  paymentMethods: PaymentMethod[];
  toggleActive: (method: PaymentMethod) => void;
  editPaymentMethod: (method: PaymentMethod) => void;
  deletePaymentMethod: (id: number) => void;
}

const PaymentList: React.FC<PaymentListProps> = ({
  paymentMethods,
  toggleActive,
  editPaymentMethod,
  deletePaymentMethod,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">💳 Métodos de Pago</h2>

      {/* Contenedor con scroll horizontal en pantallas pequeñas */}
      <div className="overflow-x-auto">
        <table className="w-full hidden md:table border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm tracking-wider">
              <th className="p-3 text-left">Entidad</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Tipo de Cuenta</th>
              <th className="p-3 text-left">NIT/CC</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods.length > 0 ? (
              paymentMethods.map((method) => (
                <tr key={method.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 text-gray-900">{method.entidad}</td>
                  <td className="p-3 text-gray-700">{method.name_account}</td>
                  <td className="p-3 text-gray-700">{method.type_account}</td>
                  <td className="p-3 text-gray-700">{method.nit_cc}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() => toggleActive(method)}
                      className={`p-2 rounded-md flex items-center gap-1 transition ${
                        method.status
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-gray-300 hover:bg-gray-400 text-black"
                      }`}
                    >
                      <Check size={20} />
                      {method.status ? "Activo" : "Inactivo"}
                    </button>

                    <button
                      onClick={() => editPaymentMethod(method)}
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center gap-1 transition"
                    >
                      <Edit2 size={20} />
                      Editar
                    </button>

                    <button
                      onClick={() => deletePaymentMethod(method.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center gap-1 transition"
                    >
                      <Trash2 size={20} />
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No hay métodos de pago registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Vista en formato tarjeta para móviles */}
      <div className="md:hidden space-y-4">
        {paymentMethods.length > 0 ? (
          paymentMethods.map((method) => (
            <div key={method.id} className="p-4 bg-gray-50 rounded-lg shadow-sm border">
              <p className="text-gray-900 font-semibold">{method.entidad}</p>
              <p className="text-gray-700">{method.name_account} - {method.type_account}</p>
              <p className="text-gray-700">NIT/CC: {method.nit_cc}</p>
              
              {/* Botones en columnas en móviles */}
              <div className="mt-3 flex flex-col gap-2">
                <button
                  onClick={() => toggleActive(method)}
                  className={`p-2 rounded-md flex items-center justify-center gap-1 transition ${
                    method.status
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gray-300 hover:bg-gray-400 text-black"
                  }`}
                >
                  <Check size={20} />
                  {method.status ? "Activo" : "Inactivo"}
                </button>

                <button
                  onClick={() => editPaymentMethod(method)}
                  className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center gap-1 transition"
                >
                  <Edit2 size={20} />
                  Editar
                </button>

                <button
                  onClick={() => deletePaymentMethod(method.id)}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center justify-center gap-1 transition"
                >
                  <Trash2 size={20} />
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No hay métodos de pago registrados.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentList;
