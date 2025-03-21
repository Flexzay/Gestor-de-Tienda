import { Truck } from "lucide-react";
import { useProviders } from "../../../hooks/bashboard/useProviders";
import { SearchBar } from "../SearchBar";
import { EditableListWithAdd } from "../EditableList";
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

  // Filtrar proveedores solo cuando `providers` o `searchTerm` cambian
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-8">
        {/* Título */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 pl-8 md:pl-0">Proveedores</h2>
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
