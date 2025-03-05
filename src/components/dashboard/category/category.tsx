import { Tag, Plus } from "lucide-react";
import { useCategories } from "../../../hooks/bashboard/useCategories";
import { SearchBar } from "../SearchBar";
import { EditableListWithAdd } from "../EditableList";
import { BackButton } from "../back_button";


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
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      
      {/* Botón de regreso */}
      <BackButton />

      {/* Título */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Categorías</h2>
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
  );
}

export default Categories;
