import type React from "react";
import { Edit2, Trash2, Check } from "lucide-react";
import type { PaymentMethod } from "../../../interface/paymentMethod";

interface PaymentListProps {
  paymentMethods: PaymentMethod[];
  toggleActive: (method: PaymentMethod) => void;
  editPaymentMethod: (method: PaymentMethod) => void;
  deletePaymentMethod: (id: number) => void;
}

const PaymentList: React.FC<PaymentListProps> = ({ paymentMethods, toggleActive, editPaymentMethod, deletePaymentMethod }) => {
  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Entidad</th>
            <th className="p-3">Nombre</th>
            <th className="p-3">Tipo de Cuenta</th>
            <th className="p-3">NIT/CC</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.map((method) => (
            <tr key={method.id} className="border-t">
              <td className="p-3">{method.entidad}</td>
              <td className="p-3">{method.name_account}</td>
              <td className="p-3">{method.type_account}</td>
              <td className="p-3">{method.nit_cc}</td>
              <td className="p-3 flex gap-3">
                <button
                  onClick={() => toggleActive(method)}
                  className={`p-2 rounded ${method.status ? "bg-green-500 text-white" : "bg-gray-300 text-black"}`}
                >
                  <Check size={20} />
                </button>
                <button
                  onClick={() => editPaymentMethod(method)}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => deletePaymentMethod(method.id)}
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
