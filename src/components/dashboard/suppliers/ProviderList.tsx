import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "lucide-react";
import Provider from "../../interface/proviter";
import { BackButton } from "./back_button";
import { SearchBar } from "./SearchBar";
import { EditableListWithAdd } from "./EditableList";
import { Button } from "./Button_Add";

interface ProviderListProps {
  providers: Provider[];
  filteredProviders: Provider[];
  editingProvider: Provider | null;
  setEditingProvider: (provider: Provider | null) => void;
  startEditing: (provider: Provider) => void;
  saveEdit: () => void;
  deleteProvider: (id: number) => void;
  newProvider: string;
  setNewProvider: (name: string) => void;
  addProvider: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function ProviderList({
  providers,
  filteredProviders,
  editingProvider,
  setEditingProvider,
  startEditing,
  saveEdit,
  deleteProvider,
  newProvider,
  setNewProvider,
  addProvider,
  searchTerm,
  setSearchTerm
}: ProviderListProps) {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      
      {/* Botón de regreso */}
      <BackButton />

      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Proveedores</h2>
        <Tag size={24} className="text-[#ff204e]" />
      </div>

      {/* Barra de búsqueda */}
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar proveedores..."
      />

      {/* Lista editable de proveedores */}
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
