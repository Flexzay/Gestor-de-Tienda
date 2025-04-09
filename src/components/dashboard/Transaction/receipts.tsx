import Sidebar from "../../../components/dashboard/Sidebar";
import useTransactions from "../../../hooks/bashboard/useTransactions";
import TransactionSummary from "../../../components/dashboard/Transaction/TransactionSummary";
import TransactionForm from "../../../components/dashboard/Transaction/TransactionForm";
import TransactionList from "../../../components/dashboard/Transaction/TransactionList";
import { useMemo } from "react";

const ExpensesIncome = () => {
  const { transactions, addTransaction, totalIncome, totalExpenses, balance } = useTransactions();

  const memoizedTransactions = useMemo(() => transactions, [transactions]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenido principal con margen izquierdo */}
      <div className="flex-1 p-6 w-full md:ml-72 md:pl-6">
        <TransactionSummary 
          totalIncome={totalIncome} 
          totalExpenses={totalExpenses} 
          balance={balance} 
        />

        <TransactionForm onSubmit={addTransaction} />

        <TransactionList transactions={memoizedTransactions} />
      </div>
    </div>
  );
};

export default ExpensesIncome;
