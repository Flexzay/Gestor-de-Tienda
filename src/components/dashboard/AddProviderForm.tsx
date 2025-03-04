import { Plus } from "lucide-react"

interface AddProviderFormProps {
  newProvider: string
  setNewProvider: (value: string) => void
  addProvider: () => void
}

export function AddProviderForm({ newProvider, setNewProvider, addProvider }: AddProviderFormProps) {
  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={newProvider}
        onChange={(e) => setNewProvider(e.target.value)}
        placeholder="Nuevo proveedor"
        className="flex-grow px-4 py-3 text-gray-700 bg-white rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff204e]"
      />
      <button onClick={addProvider} className="px-6 py-3 bg-[#ff204e] text-white rounded-r-lg hover:bg-[#ff3b60] flex items-center">
        <Plus size={20} className="mr-2" />
        Añadir
      </button>
    </div>
  )
}
