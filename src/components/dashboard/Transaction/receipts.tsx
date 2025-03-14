import Sidebar from "../../../components/dashboard/Sidebar";
import useTransactions from "../../../hooks/bashboard/useTransactions";
import TransactionSummary from "../../../components/dashboard/Transaction/TransactionSummary";
import TransactionForm from "../../../components/dashboard/Transaction/TransactionForm";
import TransactionList from "../../../components/dashboard/Transaction/TransactionList";

const ExpensesIncome = () => {
  const { transactions, addTransaction, totalIncome, totalExpenses, balance } = useTransactions();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <TransactionSummary totalIncome={totalIncome} totalExpenses={totalExpenses} balance={balance} />
        <TransactionForm onSubmit={addTransaction} />
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
};

export default ExpensesIncome;
