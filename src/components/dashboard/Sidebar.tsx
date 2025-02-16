import type React from "react";
import { Link } from "react-router-dom";
import { Home, BarChart2, Users, Settings, Layers, Menu } from "lucide-react";
import { useState } from "react";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-64 min-h-screen p-4 fixed top-0 left-0 md:relative transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center space-x-2 mb-8">
          <Layers size={32} className="text-[#ff204e]" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff204e] to-pink-500">
            Dashboard
          </span>
        </div>
        <nav>
          <ul className="space-y-2">
            {[
              { icon: Home, label: "Home", path: "/" },
              { icon: BarChart2, label: "Analytics", path: "/analytics" },
              { icon: Users, label: "Personal", path: "/Staff" },
              { icon: Settings, label: "Settings", path: "/settings" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-[#ff204e] hover:shadow-lg hover:shadow-[#ff204e]/50"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden p-2 text-white bg-[#ff204e] fixed top-4 left-4 rounded-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>
    </div>
  );
};

export default Sidebar;
