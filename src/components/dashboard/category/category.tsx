import { Tag } from "lucide-react";
import { useCategories } from "../../../hooks/bashboard/useCategories";
import { SearchBar } from "../SearchBar";
import { EditableListWithAdd } from "../EditableList";
import Sidebar from "../Sidebar";

export function Categories() {
  const {
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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar fijo a la izquierda en pantallas grandes */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-4 md:p-8 w-full">
        {/* Título */}

        <div className="flex items-center justify-between mb-6 md:mb-8 pl-12 md:pl-0">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Categorías</h2>
          <Tag size={24} className="text-[#ff204e]" />
        </div>

        {/* Barra de búsqueda */}
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar categorías..."
        />

        {/* Lista de categorías */}
        <EditableListWithAdd
          items={filteredCategories}
          editingItem={editingCategory}
          setEditingItem={setEditingCategory}
          startEditing={startEditing}
          saveEdit={saveEdit}
          deleteItem={deleteCategory}
          newItem={newCategory}
          setNewItem={setNewCategory}
          addItem={addCategory}
          placeholder="Nueva categoría"
        />
      </div>
    </div>
  );
}

export default Categories;
