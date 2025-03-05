import { Tag } from "lucide-react";
import { useProviders } from "../../../hooks/bashboard/useProviders";
import { SearchBar } from "../SearchBar";
import { EditableListWithAdd } from "../EditableList";
import { BackButton } from "../back_button";

export function ProviderList() {
  const {
    filteredProviders,
    newProvider,
    setNewProvider,
    editingProvider,
    setEditingProvider,
    searchTerm,
    setSearchTerm,
    addProvider,
    startEditing,
    saveEdit,
    deleteProvider,
  } = useProviders();

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      
      {/* Botón de regreso */}
      <BackButton />

      {/* Título */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Proveedores</h2>
        <Tag size={24} className="text-[#ff204e]" />
      </div>

      {/* Barra de búsqueda */}
      <SearchBar 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Buscar proveedores..." 
      />

      {/* Lista de proveedores */}
      <EditableListWithAdd
        items={filteredProviders}
        editingItem={editingProvider}
        setEditingItem={setEditingProvider}
        startEditing={startEditing}
        saveEdit={saveEdit}
        deleteItem={deleteProvider}
        newItem={newProvider}
        setNewItem={setNewProvider}
        addItem={addProvider}
        placeholder="Nuevo proveedor"
      /> 
    </div>
  );
}

export default ProviderList;
