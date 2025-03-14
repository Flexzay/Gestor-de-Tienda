import React, { useState } from "react";
import { Plus } from "lucide-react";
import type Transaction from "../../../interface/transaction";

interface FormProps {
  onSubmit: (transaction: Transaction) => void;
  editingTransaction?: Transaction | null;
}

const TransactionForm: React.FC<FormProps> = ({ onSubmit, editingTransaction }) => {
  const [formData, setFormData] = useState({
    type: editingTransaction?.type || "expense",
    amount: editingTransaction?.amount.toString() || "",
    category: editingTransaction?.category || "",
    description: editingTransaction?.description || "",
    date: editingTransaction?.date || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.category || !formData.date) return;

    onSubmit({
      id: editingTransaction ? editingTransaction.id : Date.now(),
      type: formData.type as "Ingresos" | "Gastos",
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
    });

    setFormData({ type: "expense", amount: "", category: "", description: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 text-center">{editingTransaction ? "Editar" : "Añadir"} Transacción</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo</label>
          <select name="type" value={formData.type} onChange={handleInputChange} className="w-full p-3 border rounded-lg shadow-sm focus:ring-[#ff204e] focus:border-[#ff204e]">
            <option value="Ingresos">Ingreso</option>
            <option value="Gastos">Gasto</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Monto</label>
          <input type="number" name="amount" placeholder="Monto" value={formData.amount} onChange={handleInputChange} className="w-full p-3 border rounded-lg shadow-sm focus:ring-[#ff204e] focus:border-[#ff204e]" />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <input type="text" name="category" placeholder="Categoría" value={formData.category} onChange={handleInputChange} className="w-full p-3 border rounded-lg shadow-sm focus:ring-[#ff204e] focus:border-[#ff204e]" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleInputChange} className="w-full p-3 border rounded-lg shadow-sm focus:ring-[#ff204e] focus:border-[#ff204e]" rows={3}></textarea>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha</label>
        <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full p-3 border rounded-lg shadow-sm focus:ring-[#ff204e] focus:border-[#ff204e]" />
      </div>
      
      <div className="flex justify-center">
        <button type="submit" className="px-6 py-3 bg-[#ff204e] text-white font-medium rounded-lg hover:bg-[#ff3b60] transition-colors duration-300 flex items-center justify-center shadow-md">
          <Plus size={20} className="mr-2" />
          {editingTransaction ? "Actualizar" : "Añadir"} Transacción
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
