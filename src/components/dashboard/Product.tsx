import type React from "react"
import { useState } from "react"
import { Package, X, PlusCircle } from "lucide-react"
import ProductFormData from "../../interface/product"


const AddProductForm: React.FC<{ onClose: () => void; onSubmit: (data: ProductFormData) => void }> = ({
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    brand: "",
    stock: 0,
    expirationDate: "",
    price: 0,
    description: "",
    sku: "",
  })

  const [categories, setCategories] = useState<string[]>(["Electrónica", "Ropa", "Alimentos", "Libros"])
  const [newCategory, setNewCategory] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" || name === "price" ? Number(value) ||  '': value,

    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory])
      setNewCategory("")
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
      
      <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          <Package className="mr-2 text-[#ff204e]" size={24} />
          Agregar Nuevo Producto
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre del Producto
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff204e] focus:ring focus:ring-[#ff204e] focus:ring-opacity-50"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <div className="flex space-x-2">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff204e] focus:ring focus:ring-[#ff204e] focus:ring-opacity-50"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Agregar nueva categoría */}
          <div className="mb-4 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Nueva Categoría"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff204e] focus:ring focus:ring-[#ff204e] focus:ring-opacity-50"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              <PlusCircle size={20} className="mr-1" /> Agregar
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
              Marca
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff204e] focus:ring focus:ring-[#ff204e] focus:ring-opacity-50"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff204e] focus:ring focus:ring-[#ff204e] focus:ring-opacity-50"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
              Fecha de Expiración
            </label>
            <input
              type="date"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff204e] focus:ring focus:ring-[#ff204e] focus:ring-opacity-50"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff204e] focus:ring focus:ring-[#ff204e] focus:ring-opacity-50"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff204e] focus:ring focus:ring-[#ff204e] focus:ring-opacity-50"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 text-white bg-[#ff204e] rounded-md hover:bg-[#ff3b61]">
              Agregar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductForm
