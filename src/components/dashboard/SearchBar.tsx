import { Search } from "lucide-react"

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
}

export function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
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
  )
}
