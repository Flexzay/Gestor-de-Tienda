import { Search } from "lucide-react";
import SearchBarProps from "../../interface/searchbar";

export function SearchBar({ value, onChange, placeholder = "Buscar..." }: SearchBarProps) {
  return (
    <div className="relative mb-6 w-full">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 md:left-4"
        size={20}
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 pl-10 text-gray-700 bg-white rounded-lg shadow-sm focus:outline-none 
                   focus:ring-2 focus:ring-[#ff204e] focus:ring-offset-2 transition-all duration-300 
                   sm:pl-12 sm:px-4 sm:py-3"
      />
    </div>
  );
}
