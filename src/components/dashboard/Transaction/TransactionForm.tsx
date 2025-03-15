import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import type Transaction from "../../../interface/transaction";

interface FormProps {
  onSubmit: (transaction: Transaction) => void;
  editingTransaction?: Transaction | null;
}

const incomeCategories = ["Sueldo", "Inversión", "Otros"];
const expenseCategories = ["Alimentación", "Transporte", "Otros"];

const TransactionForm: React.FC<FormProps> = ({ onSubmit, editingTransaction }) => {
  const [formData, setFormData] = useState({
    type: editingTransaction?.type || "Gastos",
    amount: editingTransaction?.amount?.toString() || "",
    category: editingTransaction?.category || "",
    description: editingTransaction?.description || "",
    date: editingTransaction?.date || "",
  });

  const [categories, setCategories] = useState<string[]>(expenseCategories);

  useEffect(() => {
    setCategories(formData.type === "Ingresos" ? incomeCategories : expenseCategories);
  }, [formData.type]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || !formData.category || !formData.date) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    onSubmit({
      id: editingTransaction ? editingTransaction.id : Date.now(),
      type: formData.type as "Ingresos" | "Gastos",
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
    });

    setFormData({ type: "Gastos", amount: "", category: "", description: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl space-y-6 border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 text-center">
        {editingTransaction ? "Editar" : "Añadir"} Transacción
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#ff204e] focus:border-[#ff204e] transition duration-300 bg-gray-50"
          >
            <option value="Ingresos">Ingreso</option>
            <option value="Gastos">Gasto</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Monto</label>
          <input
            type="number"
            name="amount"
            placeholder="Ej: 50000"
            value={formData.amount}
            onChange={handleInputChange}
            min="0.01"
            step="0.01"
            required
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#ff204e] focus:border-[#ff204e] transition duration-300 bg-gray-50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#ff204e] focus:border-[#ff204e] transition duration-300 bg-gray-50"
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción (Opcional)</label>
        <textarea
          name="description"
          placeholder="Añade una nota sobre la transacción"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#ff204e] focus:border-[#ff204e] transition duration-300 bg-gray-50"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#ff204e] focus:border-[#ff204e] transition duration-300 bg-gray-50"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-3 bg-[#ff204e] text-white font-medium rounded-lg hover:bg-[#ff3b60] transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-md"
        >
          <Plus size={20} className="mr-2" />
          {editingTransaction ? "Actualizar" : "Añadir"} Transacción
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
