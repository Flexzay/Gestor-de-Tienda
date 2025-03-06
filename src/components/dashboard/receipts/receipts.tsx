"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Plus, Edit2, Trash2, TrendingUp, TrendingDown } from "lucide-react"
import { Link } from "react-router-dom"
import type Transaction from "../../../interface/transaction"

export function ExpensesIncome() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: "income", amount: 1000, category: "Salario", description: "Salario mensual", date: "2023-05-01" },
    { id: 2, type: "expense", amount: 50, category: "Comida", description: "Almuerzo", date: "2023-05-02" },
  ])
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: "",
  })
  const [formError, setFormError] = useState("")

  const categories = {
    income: ["Salario", "Inversiones", "Ventas", "Otros"],
    expense: ["Comida", "Transporte", "Alquiler", "Servicios", "Entretenimiento", "Otros"],
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    if (!formData.amount || !formData.category || !formData.date) {
      setFormError("Por favor, completa todos los campos obligatorios.")
      return false
    }
    setFormError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    const newTransaction: Transaction = {
      id: editingTransaction ? editingTransaction.id : Date.now(),
      type: formData.type as "income" | "expense",
      amount: Number.parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
    }

    if (editingTransaction) {
      setTransactions(transactions.map((t) => (t.id === editingTransaction.id ? newTransaction : t)))
      setEditingTransaction(null)
    } else {
      setTransactions([...transactions, newTransaction])
    }

    setFormData({
      type: "expense",
      amount: "",
      category: "",
      description: "",
      date: "",
    })
  }

  const editTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setFormData({
      type: transaction.type,
      amount: transaction.amount.toString(),
      category: transaction.category,
      description: transaction.description,
      date: transaction.date,
    })
  }

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpenses

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/dashboard"
          className="flex items-center text-gray-600 hover:text-[#ff204e] transition-colors duration-300"
        >
          <ArrowLeft size={24} className="mr-2" />
          <span className="font-medium">Volver al Dashboard</span>
        </Link>
      </div>

      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Gastos e Ingresos</h2>

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

      <form onSubmit={handleSubmit} className="space-y-6 mb-8 bg-white p-6 rounded-lg shadow-md">
        {formError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{formError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
              required
            >
              <option value="expense">Gasto</option>
              <option value="income">Ingreso</option>
            </select>
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Monto
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
              required
            >
              <option value="">Seleccione una categoría</option>
              {categories[formData.type as keyof typeof categories].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-[#ff204e] text-white rounded-lg hover:bg-[#ff3b60] transition-colors duration-300 flex items-center justify-center shadow-sm"
          >
            <Plus size={20} className="mr-2" />
            {editingTransaction ? "Actualizar" : "Añadir"} Transacción
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Lista de Transacciones</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tipo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Monto
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Categoría
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Descripción
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.type === "income" ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        <TrendingUp size={16} className="mr-1" /> Ingreso
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        <TrendingDown size={16} className="mr-1" /> Gasto
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => editTransaction(transaction)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ExpensesIncome

