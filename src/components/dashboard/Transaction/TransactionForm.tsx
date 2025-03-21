import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import type Transaction from "../../../interface/transaction";

interface FormProps {
  onSubmit: (transaction: Transaction) => void;
  editingTransaction?: Transaction | null;
}

const incomeCategories = ["Trabajo", "Inversiones", "Regalos", "Ventas", "Otros"];
const expenseCategories = ["Comida", "Transporte", "Vivienda", "Entretenimiento", "Educación", "Salud", "Otros"];

const TransactionForm: React.FC<FormProps> = ({ onSubmit, editingTransaction }) => {
  const [formData, setFormData] = useState({
    id: 0,
    type: "Gastos",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [categories, setCategories] = useState<string[]>(expenseCategories);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Actualizar el formulario si se edita una transacción
  useEffect(() => {
    if (editingTransaction && editingTransaction.id !== formData.id) {
      setFormData({
        id: editingTransaction.id,
        type: editingTransaction.type,
        amount: editingTransaction.amount.toString(),
        category: editingTransaction.category,
        description: editingTransaction.description,
        date: editingTransaction.date,
      });
    }
  }, [editingTransaction]);

  // Cambiar categorías según el tipo de transacción
  useEffect(() => {
    const newCategories = formData.type === "Ingresos" ? incomeCategories : expenseCategories;
    setCategories(newCategories);

    if (!newCategories.includes(formData.category)) {
      setFormData((prev) => ({ ...prev, category: "" }));
    }
  }, [formData.type]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!formData.amount || parseFloat(formData.amount) < 10) {
      setError("El monto debe ser al menos 10 COP.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.category) {
      setError("Seleccione una categoría.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.date) {
      setError("Seleccione una fecha válida.");
      setIsSubmitting(false);
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

    setFormData({ id: 0, type: "Gastos", amount: "", category: "", description: "", date: "" });
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl space-y-6 border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 text-center">
        {editingTransaction ? "Editar" : "Añadir"} Transacción
      </h3>

      {error && <p className="text-red-500 text-center text-sm">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#ff204e] bg-gray-50"
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
            min="10"
            step="0.01"
            required
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#ff204e] bg-gray-50"
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
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#ff204e] bg-gray-50"
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
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#ff204e] bg-gray-50"
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
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#ff204e] bg-gray-50"
        />
      </div>

      <div className="flex justify-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-[#ff204e] text-white font-medium rounded-lg hover:bg-[#ff3b60] transition-all flex items-center justify-center shadow-md"
        >
          <Plus size={20} className="mr-2" />
          {editingTransaction ? "Actualizar" : "Añadir"} Transacción
        </motion.button>
      </div>
    </form>
  );
};

export default TransactionForm;
