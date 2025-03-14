import { ArrowUp, ArrowDown, Wallet } from "lucide-react";
import type { SummaryProps, CardProps } from "../../../interface/transactioncard";

function SummaryCard(props: CardProps) {
  const { title, amount, colorClass, icon } = props;

  return (
    <div className="w-full max-w-xs sm:max-w-md bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105">
      <div className="flex items-center justify-between mb-2">
        <h3 className={`text-lg sm:text-xl font-semibold ${colorClass}`}>{title}</h3>
        <span className="w-6 h-6 sm:w-8 sm:h-8">{icon}</span>
      </div>
      <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">
        {new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount)}
      </p>
    </div>
  );
}

function TransactionSummary(props: SummaryProps) {
  const { totalIncome, totalExpenses, balance } = props;

  return (
    <div className="px-4 mx-auto flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
      <SummaryCard 
        title="Ingresos Totales" 
        amount={totalIncome} 
        colorClass="text-green-600" 
        icon={<ArrowUp className="text-green-500 w-6 h-6 sm:w-8 sm:h-8" />} 
      />
      <SummaryCard 
        title="Gastos Totales" 
        amount={totalExpenses} 
        colorClass="text-red-600" 
        icon={<ArrowDown className="text-red-500 w-6 h-6 sm:w-8 sm:h-8" />} 
      />
      <SummaryCard 
        title="Balance" 
        amount={balance} 
        colorClass="text-blue-600" 
        icon={<Wallet className="text-blue-500 w-6 h-6 sm:w-8 sm:h-8" />} 
      />
    </div>
  );
}

export default TransactionSummary;
