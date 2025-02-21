
import { useState, useEffect } from "react"
import { Pencil, Trash2, Plus, Search, Truck, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import  Provider from "../../interface/suppliets"

export function Providers() {
  const [providers, setProviders] = useState<Provider[]>([
    { id: 1, name: "TechSupply Co.", products: 25},
    { id: 2, name: "Global Gadgets", products: 18 },
    { id: 3, name: "Eco Essentials", products: 30 },
    { id: 4, name: "Quality Electronics", products: 22},
    { id: 5, name: "Innovative Imports", products: 15}
  ])
  const [newProvider, setNewProvider] = useState("")
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProviders, setFilteredProviders] = useState(providers)

  useEffect(() => {
    const results = providers.filter((provider) => provider.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredProviders(results)
  }, [providers, searchTerm])

  const addProvider = () => {
    if (newProvider.trim() !== "") {
      const newProv = { id: Date.now(), name: newProvider, products: 0, rating: 0 }
      setProviders([...providers, newProv])
      setNewProvider("")
    }
  }

  const startEditing = (provider: Provider) => {
    setEditingProvider(provider)
  }

  const saveEdit = () => {
    if (editingProvider) {
      setProviders(providers.map((prov) => (prov.id === editingProvider.id ? editingProvider : prov)))
      setEditingProvider(null)
    }
  }

  const deleteProvider = (id: number) => {
    setProviders(providers.filter((prov) => prov.id !== id))
  }

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/dashboard"
          className="flex items-center text-gray-600 hover:text-[#ff204e] transition-colors duration-300"
        >
          <ArrowLeft size={24} className="mr-2" />
          <span className="font-medium">Volver al Dashboard</span>
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Proveedores</h2>
        <Truck size={24} className="text-[#ff204e]" />
      </div>

      {/* Barra de búsqueda */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Buscar proveedores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-12 text-gray-700 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff204e] transition-all duration-300"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {/* Lista de proveedores */}
      <ul className="space-y-4 mb-8">
        <AnimatePresence>
          {filteredProviders.map((provider) => (
            <motion.li
              key={provider.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-[#ff204e] bg-red-100 px-3 py-1 rounded-full">
                  {provider.products}
                </span>
                {editingProvider && editingProvider.id === provider.id ? (
                  <input
                    type="text"
                    value={editingProvider.name}
                    onChange={(e) => setEditingProvider({ ...editingProvider, name: e.target.value })}
                    className="border-b-2 border-gray-300 px-2 py-1 focus:outline-none focus:border-[#05f2f2]"
                    autoFocus
                  />
                ) : (
                  <span className="text-gray-800 font-medium">{provider.name}</span>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  {editingProvider && editingProvider.id === provider.id ? (
                    <button onClick={saveEdit} className="text-[#7B9400] hover:text-[#7B9400] transition-colors">
                      Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(provider)}
                      className="text-gray-500 hover:text-[#05f2f2] transition-colors"
                    >
                      <Pencil size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteProvider(provider.id)}
                    className="text-gray-500 hover:text-[#ff204e] transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Formulario para añadir nuevo proveedor */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={newProvider}
          onChange={(e) => setNewProvider(e.target.value)}
          placeholder="Nuevo proveedor"
          className="flex-grow px-4 py-3 text-gray-700 bg-white rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff204e] transition-all duration-300"
        />
        <button
          onClick={addProvider}
          className="px-6 py-3 bg-[#ff204e] text-white rounded-r-lg hover:bg-[#ff3b60] transition-colors duration-300 flex items-center justify-center shadow-sm"
        >
          <Plus size={20} className="mr-2" />
          Añadir
        </button>
      </div>
    </div>
  )
}

export default Providers

