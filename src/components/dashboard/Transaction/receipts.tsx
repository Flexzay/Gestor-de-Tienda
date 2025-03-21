import Sidebar from "../../../components/dashboard/Sidebar";
import useTransactions from "../../../hooks/bashboard/useTransactions";
import TransactionSummary from "../../../components/dashboard/Transaction/TransactionSummary";
import TransactionForm from "../../../components/dashboard/Transaction/TransactionForm";
import TransactionList from "../../../components/dashboard/Transaction/TransactionList";
import { useMemo } from "react";

const ExpensesIncome = () => {
  const { transactions, addTransaction, totalIncome, totalExpenses, balance } = useTransactions();

  // Memoiza la lista de transacciones para mejorar el rendimiento
  const memoizedTransactions = useMemo(() => transactions, [transactions]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-8">
        {/* Resumen de transacciones */}
        <TransactionSummary totalIncome={totalIncome} totalExpenses={totalExpenses} balance={balance} />

        {/* Formulario para agregar transacción */}
        <TransactionForm onSubmit={addTransaction} />

        {/* Lista de transacciones */}
        <TransactionList transactions={memoizedTransactions} />
      </div>
    </div>
  );
};

export default ExpensesIncome;
