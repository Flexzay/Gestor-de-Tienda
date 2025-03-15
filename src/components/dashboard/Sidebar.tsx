import { Link, useLocation } from "react-router-dom"; // Importamos useLocation
import {
  Home, Users, Settings, Layers,
  Menu, Tags, Boxes, Wallet, Coins, BadgeDollarSign
} from "lucide-react";
import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-64 min-h-screen p-4 fixed top-0 left-0 md:relative transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Botón para cerrar el Sidebar en móviles */}
        <button
          className="md:hidden p-2 text-white bg-gray-700 absolute top-4 right-4 rounded-lg"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>

        {/* Logo y Título */}
        <div className="flex items-center space-x-2 mb-8">
          <Layers size={32} className="text-[#ff204e] hidden md:block" />  {/* 🔹 Ocultamos en móviles */}
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff204e] to-pink-500">
            Panel de Control
          </span>
        </div>

        <nav>
          <ul className="space-y-2">
            {[
              { icon: Home, label: "Home", path: "/Dashboard" },
              { icon: Users, label: "Personal", path: "/Staff" },
              { icon: Tags, label: "Categoria", path: "/Category" },
              { icon: Boxes, label: "Provedores", path: "/Suppliers" },
              { icon: Wallet, label: "Metodos de Pago", path: "/Payment-methods" },
              { icon: Coins, label: "Gastos - Ingresos", path: "/Income" }, 
              { icon: BadgeDollarSign , label: "Ventas", path: "/Sales" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ease-in-out 
                    ${isActive(item.path) ? 'bg-[#ff204e] text-white' : 'hover:bg-[#ff204e] hover:shadow-lg hover:shadow-[#ff204e]/50'}`} 
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

      {/* Botón para abrir el Sidebar en móviles (solo aparece si el sidebar está cerrado) */}
      {!isOpen && (
        <button
          className="md:hidden p-2 text-white bg-[#ff204e] fixed top-4 left-4 rounded-lg z-50"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}
    </div>
  );
}

export default Sidebar;
