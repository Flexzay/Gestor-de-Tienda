import { Truck } from "lucide-react";
import { useProviders } from "../../../hooks/bashboard/useProviders";
import { SearchBar } from "../SearchBar";
import { EditableListWithAdd } from "../shop/EditableList";
import Sidebar from "../Sidebar";
import { useMemo, useCallback } from "react";

export function ProviderList() {
  const {
    providers,
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

  // Filtrar proveedores solo cuando cambien providers o searchTerm
  const filteredProviders = useMemo(() => {
    return providers.filter((provider) =>
      provider.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [providers, searchTerm]);

  // Manejo eficiente del cambio en la barra de búsqueda
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar fijo en pantallas grandes */}
      <Sidebar />

      {/* Contenido principal con margen izquierdo y espacio */}
      <div className="flex-1 p-4 md:p-8 w-full md:ml-72 md:pl-6">
        {/* Título */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Proveedores</h2>
          <Truck size={24} className="text-[#ff204e]" />
        </div>

        {/* Barra de búsqueda */}
        <SearchBar 
          value={searchTerm} 
          onChange={handleSearchChange} 
          placeholder="Buscar proveedores..." 
          aria-label="Buscar proveedores"
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
    </div>
  );
}

export default ProviderList;
