import { Link, useLocation } from "react-router-dom";
import { Home, Users, Tags, Boxes, Wallet, Coins, BadgeDollarSign, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import Domiduck from "../../assets/img/horizontal-logo.svg";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [shop, setShop] = useState<{ name: string; image: string } | null>(null);
  const location = useLocation();

  useEffect(() => {
    const storedShop = localStorage.getItem("shop_data");

    if (storedShop) {
      const parsedShop = JSON.parse(storedShop);
      setShop({
        name: parsedShop.name,
        image: parsedShop.media?.front?.path || "https://via.placeholder.com/150", // ✅ Usa la imagen o un placeholder
      });
    }
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex">
      <aside
        className={`bg-gray-900 text-white w-72 min-h-screen p-5 fixed top-0 left-0 md:relative transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          className="md:hidden p-2 text-white bg-gray-700 absolute top-4 left-60 rounded-lg z-50"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>

        {/* Logo de la tienda */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-full flex justify-center">
            <div className="p-6 rounded-xl shadow-lg w-full flex justify-center">
              <img src={Domiduck} alt="Domiduck" className="w-40 h-auto drop-shadow-lg animate-fadeIn" />
            </div>
          </div>
        </div>

        {/* Sección de la Tienda en una barra separada debajo del logo */}
        {shop && (
          <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-md mt-4">
            <img
              src={shop.image}
              alt={shop.name}
              className="h-14 w-14 rounded-full object-cover border-2 border-[#ff204e] shadow-lg"
            />
            <span className="text-lg font-semibold text-white">{shop.name}</span>
          </div>
        )}



        {/* Menú de navegación */}
        <nav>
          <ul className="space-y-3">
            {[
              { icon: Home, label: "Home", path: "/Dashboard" },
              { icon: Users, label: "Personal", path: "/Staff" },
              { icon: Tags, label: "Categoría", path: "/Category" },
              { icon: Boxes, label: "Proveedores", path: "/Suppliers" },
              { icon: Wallet, label: "Métodos de Pago", path: "/Payment-methods" },
              { icon: Coins, label: "Gastos - Ingresos", path: "/Income" },
              { icon: BadgeDollarSign, label: "Ventas", path: "/Sales" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ease-in-out 
                    ${isActive(item.path) ? "bg-[#ff204e] text-white" : "hover:bg-[#ff204e] hover:shadow-lg hover:shadow-[#ff204e]/50"}`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={24} />
                  <span className="text-lg font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Botón para abrir el Sidebar en móviles */}
      {!isOpen && (
        <button
          className="md:hidden p-3 text-white bg-[#ff204e] fixed top-4 left-4 rounded-lg z-50"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      )}
    </div>
  );
}

export default Sidebar;
