
import type React from "react"
import { useState } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"
import Category from "../../interface/category"



const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Electrónica" },
    { id: 2, name: "Ropa" },
    { id: 3, name: "Hogar" },
  ])
  const [newCategory, setNewCategory] = useState("")
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const addCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, { id: Date.now(), name: newCategory }])
      setNewCategory("")
    }
  }

  const startEditing = (category: Category) => {
    setEditingCategory(category)
  }

  const saveEdit = () => {
    if (editingCategory) {
      setCategories(categories.map((cat) => (cat.id === editingCategory.id ? editingCategory : cat)))
      setEditingCategory(null)
    }
  }

  const deleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Categorías</h2>

      {/* Lista de categorías */}
      <ul className="space-y-2 mb-4">
        {categories.map((category) => (
          <li key={category.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
            {editingCategory && editingCategory.id === category.id ? (
              <input
                type="text"
                value={editingCategory.name}
                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                className="border rounded px-2 py-1 w-full mr-2"
              />
            ) : (
              <span>{category.name}</span>
            )}
            <div className="flex space-x-2">
              {editingCategory && editingCategory.id === category.id ? (
                <button onClick={saveEdit} className="text-green-600 hover:text-green-800">
                  Guardar
                </button>
              ) : (
                <button onClick={() => startEditing(category)} className="text-blue-600 hover:text-blue-800">
                  <Pencil size={18} />
                </button>
              )}
              <button onClick={() => deleteCategory(category.id)} className="text-red-600 hover:text-red-800">
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Formulario para añadir nueva categoría */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nueva categoría"
          className="border rounded px-3 py-2 w-full"
        />
        <button
          onClick={addCategory}
          className="bg-[#ff204e] text-white px-4 py-2 rounded hover:bg-[#ff3b60] transition-colors flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Añadir
        </button>
      </div>
    </div>
  )
}

export default Categories

