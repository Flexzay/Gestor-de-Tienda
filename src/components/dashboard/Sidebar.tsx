import { Link, useLocation } from "react-router-dom";
import { Home, Users, Tags, Boxes, Wallet, Coins, BadgeDollarSign, Menu, Power } from "lucide-react";
import { useState, useEffect } from "react";
import { shopService } from "../../Services/shop.service";
import { Button } from "./shop/Button";
import Domiduck from "../../assets/img/horizontal-logo.svg";
import domiduck from "../../assets/img/domiduck.svg";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [shop, setShop] = useState<{ name: string; image?: string } | null>(null);
  const [isShopOpen, setIsShopOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchShop = () => {
      const shopData = shopService.getShopData();
      if (shopData) {
        setShop({
          name: shopData.name,
          image: shopService.getShopImage() || domiduck,
        });
      }
    };
    fetchShop();
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const toggleShopStatus = () => {
    setIsShopOpen((prev) => !prev);
    console.log(isShopOpen ? "Cerrando tienda" : "Abriendo tienda");
    // Aquí puedes agregar la lógica para cambiar el estado de la tienda
  };

  return (
    <div className="flex">
      <aside
        className={`bg-gray-900 text-white w-72 min-h-screen p-5 fixed top-0 left-0 md:relative transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          className="md:hidden p-2 text-white bg-gray-700 absolute top-4 left-60 rounded-lg z-50"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>

        <div className="flex justify-center mb-4">
          <img src={Domiduck} alt="Domiduck" className="w-40 h-auto drop-shadow-lg" />
        </div>

        {shop && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center mb-6">
            <img
              src={shop.image}
              alt={shop.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-[#ff204e] shadow-lg"
              onError={(e) => (e.currentTarget.src = domiduck)}
            />
            <span className="text-lg font-semibold text-white mt-2">{shop.name}</span>
            <Link to="/shop-profile" className="text-sm text-[#ff204e] hover:underline mt-1">
              Ver perfil
            </Link>
          </div>
        )}

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
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ease-in-out ${
                    isActive(item.path) ? "bg-[#ff204e] text-white" : "hover:bg-[#ff204e] hover:shadow-lg"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={24} />
                  <span className="text-lg font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botón Cerrar/Abrir Tienda */}
        <div className="mt-6 flex justify-center">
          <Button
            variant="primary"
            className={`w-full p-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md transition-all duration-300 ${
              isShopOpen ? "bg-[#ff204e] text-white hover:bg-[#ff3b60]" : "bg-green-600 text-white hover:bg-green-700"
            }`}
            icon={Power}
            text={isShopOpen ? "Cerrar Tienda" : "Abrir Tienda"}
            onClick={toggleShopStatus}
          />
        </div>
      </aside>

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
