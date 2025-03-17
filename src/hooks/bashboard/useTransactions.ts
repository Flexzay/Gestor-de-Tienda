import { useState } from "react";
import Transaction from "../../interface/transaction";

const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(transactions.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t)));
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const totalIncome = transactions.filter((t) => t.type === "Ingresos").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "Gastos").reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  return { transactions, addTransaction, updateTransaction, deleteTransaction, totalIncome, totalExpenses, balance };
};

export default useTransactions;
