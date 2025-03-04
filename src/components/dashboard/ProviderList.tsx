import { motion, AnimatePresence } from "framer-motion"
import { Pencil, Trash2 } from "lucide-react"
import Provider from "../../interface/proviter"

interface ProviderListProps {
  providers: Provider[]
  editingProvider: Provider | null
  startEditing: (provider: Provider) => void
  saveEdit: () => void
  deleteProvider: (id: number) => void
  setEditingProvider: (provider: Provider) => void
}

export function ProviderList({
  providers,
  editingProvider,
  startEditing,
  saveEdit,
  deleteProvider,
  setEditingProvider
}: ProviderListProps) {
  return (
    <ul className="space-y-4 mb-8">
      <AnimatePresence>
        {providers.map((provider) => (
          <motion.li
            key={provider.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
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
            <div className="flex space-x-2">
              {editingProvider && editingProvider.id === provider.id ? (
                <button onClick={saveEdit} className="text-[#7B9400] hover:text-[#7B9400] transition-colors">
                  Guardar
                </button>
              ) : (
                <button onClick={() => startEditing(provider)} className="text-gray-500 hover:text-[#05f2f2]">
                  <Pencil size={18} />
                </button>
              )}
              <button onClick={() => deleteProvider(provider.id)} className="text-gray-500 hover:text-[#ff204e]">
                <Trash2 size={18} />
              </button>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}
