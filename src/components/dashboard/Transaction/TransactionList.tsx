import React from "react";
import Transaction from "../../../interface/transaction";

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Lista de Transacciones</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4">{transaction.type}</td>
              <td className="px-6 py-4">${transaction.amount.toFixed(2)}</td>
              <td className="px-6 py-4">{transaction.category}</td>
              <td className="px-6 py-4">{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
