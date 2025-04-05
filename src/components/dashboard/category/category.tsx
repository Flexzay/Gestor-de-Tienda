import { Tag } from "lucide-react";
import { useCategories } from "../../../hooks/bashboard/useCategories";
import { SearchBar } from "../SearchBar";
import { EditableListWithAdd } from "../shop/EditableList";
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
      {/* Sidebar fijo en pantallas grandes */}
      <div className="hidden md:block md:fixed md:top-0 md:left-0 md:h-full md:w-72 bg-white shadow-md z-10">
        <Sidebar />
      </div>

      {/* Contenido principal con margen izquierdo y espaciado adicional */}
      <div className="flex-1 p-4 md:p-8 w-full md:ml-72 md:pl-6">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Categorías</h2>
          <Tag size={24} className="text-[#ff204e]" />
        </div>

        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar categorías..."
        />

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
