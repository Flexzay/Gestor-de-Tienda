import React from "react";
import { motion } from "framer-motion";
import Transaction from "../../../interface/transaction";

interface TransactionListProps {
  transactions: Transaction[];
}

// Función para formatear moneda COP
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

// Función para formatear fecha en español
const formatDate = (date: string) =>
  new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(new Date(date));

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="w-full mx-auto px-4">
      <h3 className="text-2xl font-semibold mb-6 mt-6 text-gray-800 text-center">
        Lista de Transacciones
      </h3>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">No hay transacciones registradas.</p>
      ) : (
        <>
          {/* Tabla en pantallas grandes */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full bg-white shadow-xl rounded-xl overflow-hidden">
              <thead className="bg-gradient-to-r from-[#ec013066] to-[#ff204e80] text-white">
                <tr>
                  {["Tipo", "Monto", "Categoría", "Fecha", "Descripción"].map((header) => (
                    <th key={header} className="px-6 py-3 text-left text-xs font-medium uppercase">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {transactions.map((transaction) => (
                  <motion.tr
                    key={transaction.id}
                    className="hover:bg-[#ff204e10] transition"
                    whileHover={{ scale: 1.02 }}
                  >
                    <td className="px-6 py-4">{transaction.type}</td>
                    <td
                      className={`px-6 py-4 font-bold ${
                        transaction.type === "Gastos" ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-6 py-4">{transaction.category}</td>
                    <td className="px-6 py-4 text-gray-500">{formatDate(transaction.date)}</td>
                    <td className="px-6 py-4 text-gray-700">{transaction.description || "—"}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tarjetas en móvil */}
          <div className="md:hidden space-y-4">
            {transactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                className="bg-white shadow-md rounded-xl p-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Tipo:</span>
                  <span className="text-gray-900">{transaction.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Monto:</span>
                  <span
                    className={`font-bold ${
                      transaction.type === "Gastos" ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Categoría:</span>
                  <span className="text-gray-700">{transaction.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Fecha:</span>
                  <span className="text-gray-500">{formatDate(transaction.date)}</span>
                </div>
                {transaction.description && (
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="font-semibold text-gray-600">Descripción: </span>
                    {transaction.description}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionList;
