import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Tags,
  Boxes,
  Wallet,
  Coins,
  Menu,
  Power,
  WalletCards,
  Webhook,
  Store 
} from "lucide-react";
import { useState, useEffect } from "react";
import { shopService } from "../../Services/shop.service";
import { Button } from "./shop/Button";
import Domiduck from "../../assets/img/horizontal-logo.svg";
import domiduck from "../../assets/img/domiduck.svg";
import { useShopStatus } from "../../hooks/bashboard/useShopStatus";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [shop, setShop] = useState<{ name: string; image?: string } | null>(null);
  const location = useLocation();
  const { isShopOpen, toggleShopStatus, loading } = useShopStatus();

  useEffect(() => {
    const shopData = shopService.getShopData();
    if (shopData) {
      setShop({
        name: shopData.name,
        image: shopService.getShopImage() || domiduck
      });
    }
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Sidebar fijo */}
      <aside
        className={`fixed top-0 left-0 w-72 h-screen overflow-y-auto bg-gray-900 text-white p-5 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-5 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
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
              className="h-20 w-20 rounded-full border-2 border-[#ff204e] shadow-lg bg-white object-cover object-center"
              onError={(e) => (e.currentTarget.src = domiduck)}
            />
            <span className="text-lg font-semibold text-white mt-2">{shop.name}</span>
            <Link to="/store-profile" className="text-sm text-[#ff204e] hover:underline mt-1">
              Ver perfil
            </Link>
          </div>
        )}  

        <nav>
          <ul className="space-y-3">
            {[
              { icon: Home, label: "Home", path: "/Dashboard" },
              { icon: Users, label: "Personal-API", path: "/Staff" },
              { icon: Tags, label: "Categoría", path: "/Category" },
             { icon: Boxes, label: "Proveedores-API", path: "/Suppliers" },
              { icon: Wallet, label: "Métodos de Pago", path: "/Payment-methods" },
              { icon: Coins, label: "Gastos - Ingresos-API", path: "/Income" },
              { icon: WalletCards, label: "Membresía", path: "/Membership" },
              { icon: Webhook, label: "En Sitio ", path: "/Onsite" },
              { icon: Store , label: "En App", path: "/Store" }
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ease-in-out ${
                    isActive(item.path)
                      ? "bg-[#ff204e] text-white"
                      : "hover:bg-[#ff204e] hover:shadow-lg"
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

        <div className="mt-6 flex justify-center pb-10 md:pb-0">
          <Button
            variant="primary"
            className={`w-full p-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md transition-all duration-300 ${
              isShopOpen
                ? "bg-[#ff204e] text-white hover:bg-[#ff3b60]"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            icon={Power}
            text={loading ? "Cargando..." : isShopOpen ? "Cerrar Tienda" : "Abrir Tienda"}
            onClick={toggleShopStatus}
            disabled={loading}
          />
        </div>
      </aside>

      {/* Botón de abrir menú en móvil */}
      {!isOpen && (
        <button
          className="md:hidden p-3 text-white bg-[#ff204e] fixed top-4 left-4 rounded-lg z-50"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      )}
    </>
  );
}

export default Sidebar;
