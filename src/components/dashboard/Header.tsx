import type React from "react";
import { Bell, User, Search, Menu } from "lucide-react";
import { useState } from "react";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center w-full">
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} className="text-gray-800" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Welcome, User!</h1>
      </div>
      <div className="relative hidden md:block w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff204e] focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-600 hover:text-[#ff204e] transition-colors">
          <Bell size={24} />
          <span className="absolute top-0 right-0 h-4 w-4 bg-[#ff204e] rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>
        <button className="flex items-center space-x-2 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors">
          <User size={24} className="text-[#ff204e]" />
          <span className="font-medium text-gray-700 hidden md:inline">Profile</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
