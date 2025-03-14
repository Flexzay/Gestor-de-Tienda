import React from "react";

interface SummaryProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

const TransactionSummary: React.FC<SummaryProps> = ({ totalIncome, totalExpenses, balance }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-green-600">Ingresos Totales</h3>
        <p className="text-2xl font-bold">${totalIncome.toFixed(2)}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-red-600">Gastos Totales</h3>
        <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-blue-600">Balance</h3>
        <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default TransactionSummary;
