import type React from "react";
import { Edit2, Trash2, Check, CreditCard } from "lucide-react";
import type { PaymentMethod } from "../../../interface/paymentMethod";

interface PaymentListProps {
  methods: PaymentMethod[]; 
  toggleActive: (method: PaymentMethod) => void;
  editPaymentMethod: (method: PaymentMethod) => void;
  deletePaymentMethod: (id: number) => void;
}

const PaymentList: React.FC<PaymentListProps> = ({
  methods,
  toggleActive,
  editPaymentMethod,
  deletePaymentMethod,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <CreditCard size={24} /> Métodos de Pago
      </h2>

      {/* Vista de tabla para pantallas grandes */}
      <div className="overflow-x-auto">
        <table className="w-full hidden md:table border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm tracking-wider">
              <th className="p-3 text-left">Entidad</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Tipo</th>
              <th className="p-3 text-left">NIT/CC</th>
              <th className="p-3 text-left">Número</th>
              <th className="p-3 text-left">QR</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {methods.length > 0 ? (
              methods.map((method) => (
                <tr key={method.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 text-gray-900 font-medium">{method.entidad}</td>
                  <td className="p-3 text-gray-700">{method.name_account}</td>
                  <td className="p-3 text-gray-700">{method.type_account}</td>
                  <td className="p-3 text-gray-700">{method.nit_cc}</td>
                  <td className="p-3 text-gray-700">{method.account || 'N/A'}</td>
                  <td className="p-3">
                    {method.qr_code && (
                      <img 
                        src={method.qr_code} 
                        alt="QR" 
                        className="w-10 h-10 object-cover cursor-pointer"
                        onClick={() => window.open(method.qr_code, '_blank', 'noopener,noreferrer')}

                      />
                    )}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      method.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {method.status ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
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
                    </button>
                    <button
                      onClick={() => editPaymentMethod(method)}
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center gap-1 transition"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => deletePaymentMethod(method.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center gap-1 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  <div className="flex flex-col items-center py-8">
                    <CreditCard size={48} className="text-gray-400 mb-2" />
                    No hay métodos de pago registrados
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Vista móvil */}
      <div className="md:hidden space-y-4">
        {methods.length > 0 ? (
          methods.map((method) => (
            <div key={method.id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-900 font-semibold">{method.entidad}</p>
                  <p className="text-gray-600 text-sm">{method.type_account}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  method.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {method.status ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-gray-500">Nombre</p>
                  <p className="text-gray-700">{method.name_account}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">NIT/CC</p>
                  <p className="text-gray-700">{method.nit_cc}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Número</p>
                  <p className="text-gray-700">{method.account || 'N/A'}</p>
                </div>
              </div>

              {method.qr_code && (
                <div className="mt-2 flex justify-center">
                  <img 
                    src={method.qr_code} 
                    alt="QR" 
                    className="w-24 h-24 object-cover cursor-pointer"
                    onClick={() => window.open(method.qr_code, '_blank')}
                  />
                </div>
              )}

              <div className="mt-3 grid grid-cols-3 gap-2">
                <button
                  onClick={() => toggleActive(method)}
                  className={`p-2 rounded-md flex items-center justify-center gap-1 transition ${
                    method.status
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gray-300 hover:bg-gray-400 text-black"
                  }`}
                >
                  <Check size={18} />
                </button>
                <button
                  onClick={() => editPaymentMethod(method)}
                  className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center gap-1 transition"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => deletePaymentMethod(method.id)}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center justify-center gap-1 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <CreditCard size={48} className="mx-auto text-gray-400" />
            <p className="mt-2 text-gray-500">No hay métodos de pago registrados</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentList;
