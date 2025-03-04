import type React from "react";
import { useState, useEffect } from "react";
import { Package, X } from "lucide-react";
import { ProductFormData } from "../../interface/product";
import { useCategories } from "../../hooks/bashboard/useCategories";

interface AddProductFormProps {
  onClose: () => void;
  onSubmit: (product: ProductFormData) => void;
  initialData?: ProductFormData | null;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onClose, onSubmit, initialData }) => {
  const { categories } = useCategories();
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      name: "",
      category: "",
      brand: "",
      stock: 0,
      expirationDate: "",
      price: 0,
      description: "",
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" || name === "price" ? Number(value) || "" : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          <Package className="mr-2 text-[#ff204e]" size={24} />
          {initialData ? "Editar Producto" : "Agregar Nuevo Producto"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required 
              className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#ff204e] focus:ring-[#ff204e]" />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange} required
              className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#ff204e] focus:ring-[#ff204e]">
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Marca</label>
            <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} required
              className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#ff204e] focus:ring-[#ff204e]" />
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
            <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} required
              className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#ff204e] focus:ring-[#ff204e]" />
          </div>

          <div>
            <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Fecha de Vencimiento</label>
            <input type="date" id="expirationDate" name="expirationDate" value={formData.expirationDate} onChange={handleChange} required
              className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#ff204e] focus:ring-[#ff204e]" />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required
              className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#ff204e] focus:ring-[#ff204e]" />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} required
              className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#ff204e] focus:ring-[#ff204e]"></textarea>
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-md">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-white bg-[#ff204e] rounded-md">{initialData ? "Actualizar Producto" : "Agregar Producto"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
