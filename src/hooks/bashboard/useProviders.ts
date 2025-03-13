import { useState, useEffect } from "react";
import Provider from "../../interface/proviter";

export function useProviders() {
  const [providers, setProviders] = useState<Provider[]>([
    { id: 1, name: "Alpina", products: 25 },
    { id: 2, name: "Colombia", products: 18 },
    { id: 3, name: "Familia", products: 30 },
    { id: 4, name: "El Rey", products: 22 },
    { id: 5, name: "Coca-Cola", products: 15 },
  ]);

  const [newProvider, setNewProvider] = useState("");
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProviders, setFilteredProviders] = useState(providers);

  // Función para capitalizar la primera letra
  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  useEffect(() => {
    setFilteredProviders(
      providers.filter((provider) =>
        provider.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [providers, searchTerm]);

  const addProvider = () => {
    if (newProvider.trim() !== "") {
      const capitalizedProvider = capitalizeFirstLetter(newProvider);
      const newProv = { id: Date.now(), name: capitalizedProvider, products: 0 };

      setProviders([...providers, newProv]);
      setNewProvider("");
    }
  };

  const startEditing = (provider: Provider) => {
    setEditingProvider(provider);
  };

  const saveEdit = () => {
    if (editingProvider) {
      const capitalizedProvider = {
        ...editingProvider,
        name: capitalizeFirstLetter(editingProvider.name),
      };

      setProviders(
        providers.map((prov) =>
          prov.id === editingProvider.id ? capitalizedProvider : prov
        )
      );
      setEditingProvider(null);
    }
  };

  const deleteProvider = (id: number) => {
    setProviders(providers.filter((prov) => prov.id !== id));
  };

  return {
    providers,
    newProvider,
    setNewProvider,
    editingProvider,
    setEditingProvider,
    searchTerm,
    setSearchTerm,
    filteredProviders,
    addProvider,
    startEditing,
    saveEdit,
    deleteProvider,
  };
}
