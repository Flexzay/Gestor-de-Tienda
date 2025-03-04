import { Pencil, Trash2, Plus, Tag, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/bashboard/useCategories";
import { SearchBar } from "./SearchBar";

export function Categories() {
  const {
    categories,
    filteredCategories,
    newCategory,
    setNewCategory,
    editingCategory,
    setEditingCategory,
    searchTerm,
    setSearchTerm,
    addCategory,
    startEditing,
    saveEdit,
    deleteCategory,
  } = useCategories();

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      {/* Botón de regreso */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/dashboard"
          className="flex items-center text-gray-600 hover:text-[#ff204e] transition-colors duration-300"
        >
          <ArrowLeft size={24} className="mr-2" />
          <span className="font-medium">Volver al Dashboard</span>
        </Link>
      </div>

      {/* Título */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Categorías</h2>
        <Tag size={24} className="text-[#ff204e]" />
      </div>

      {/* Componente reutilizable de búsqueda */}
      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar categorías..." />

      {/* Lista de categorías */}
      <ul className="space-y-4 mb-8">
        <AnimatePresence>
          {filteredCategories.map((category) => (
            <motion.li
              key={category.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                {editingCategory?.id === category.id ? (
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, name: e.target.value })
                    }
                    className="border-b-2 border-gray-300 px-2 py-1 focus:outline-none focus:border-[#ff204e]"
                    autoFocus
                  />
                ) : (
                  <span className="text-gray-800 font-medium">{category.name}</span>
                )}
              </div>
              <div className="flex space-x-2">
                {editingCategory?.id === category.id ? (
                  <button
                    onClick={saveEdit}
                    className="text-[#7B9400] hover:text-[#7B9400] transition-colors"
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(category)}
                    className="text-gray-500 hover:text-[#05f2f2] transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                )}
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="text-gray-500 hover:text-[#ff204e] transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Input y botón para añadir nueva categoría */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nueva categoría"
          className="flex-grow px-4 py-3 text-gray-700 bg-white rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff204e] transition-all duration-300"
        />
        <button
          onClick={addCategory}
          className="px-6 py-3 bg-[#ff204e] text-white rounded-r-lg hover:bg-[#ff3b60] transition-colors duration-300 flex items-center justify-center shadow-sm"
        >
          <Plus size={20} className="mr-2" />
          Añadir
        </button>
      </div>
    </div>
  );
}

export default Categories;
