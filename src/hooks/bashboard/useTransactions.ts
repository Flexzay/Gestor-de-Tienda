import { useState } from "react"
import type { Transaction } from "../../interface/transaction"

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: "income", amount: 1000, category: "Salario", description: "Salario mensual", date: "2023-05-01" },
    { id: 2, type: "expense", amount: 50, category: "Comida", description: "Almuerzo", date: "2023-05-02" },
  ])
  
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction])
  }

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(transactions.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t)))
    setEditingTransaction(null)
  }

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpenses

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    editingTransaction,
    setEditingTransaction,
    totalIncome,
    totalExpenses,
    balance,
  }
}
