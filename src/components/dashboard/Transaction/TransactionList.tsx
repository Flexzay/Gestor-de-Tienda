import React from "react";
import Transaction from "../../../interface/transaction";

interface TransactionListProps {
  transactions: Transaction[];
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const textColor = transaction.type === "Gastos" ? "text-red-600" : "text-green-600";

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col md:table-row md:p-0 md:shadow-none">
      <div className="flex justify-between md:table-cell md:px-6 md:py-4">
        <span className="font-semibold text-gray-600 md:hidden">Tipo:</span>
        <span className="text-gray-900">{transaction.type}</span>
      </div>
      <div className="flex justify-between md:table-cell md:px-6 md:py-4">
        <span className="font-semibold text-gray-600 md:hidden">Monto:</span>
        <span className={`${textColor} font-bold`}>
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(transaction.amount)}
        </span>
      </div>
      <div className="flex justify-between md:table-cell md:px-6 md:py-4">
        <span className="font-semibold text-gray-600 md:hidden">Categoría:</span>
        <span className="text-gray-700">{transaction.category}</span>
      </div>
      <div className="flex justify-between md:table-cell md:px-6 md:py-4">
        <span className="font-semibold text-gray-600 md:hidden">Fecha:</span>
        <span className="text-gray-500">
          {new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(new Date(transaction.date))}
        </span>
      </div>
    </div>
  );
}

function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="w-full mx-auto px-4">
      <h3 className="text-2xl font-semibold mb-6 mt-6 text-gray-800 text-center">Lista de Transacciones</h3>

      {/* Tabla en pantallas grandes */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-white shadow-xl rounded-xl overflow-hidden">
          <thead className="bg-gradient-to-r from-[#ec013066] to-[#ff204e80] text-white">
            <tr>
              {["Tipo", "Monto", "Categoría", "Fecha"].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium uppercase">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-[#ff204e10] transition">
                <td className="px-6 py-4">{transaction.type}</td>
                <td
                  className={`px-6 py-4 font-bold ${
                    transaction.type === "Gastos" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(transaction.amount)}
                </td>
                <td className="px-6 py-4">{transaction.category}</td>
                <td className="px-6 py-4 text-gray-500">
                  {new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(new Date(transaction.date))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tarjetas en móvil */}
      <div className="md:hidden space-y-4">
        {transactions.map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
