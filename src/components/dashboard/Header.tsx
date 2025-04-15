import { Menu, LogOut, X } from "lucide-react";
import { useState, useEffect } from "react";
import { authService } from "../../Services/auth.service";
import { shopService } from "../../Services/shop.service";
import DuckIcon from "../../assets/img/ducks.svg";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ducks, setDucks] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await shopService.getBalance();
      setDucks(balance);
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between w-full">
      {/* Menú móvil + Título */}
      <div className="flex items-center space-x-4">
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} className="text-gray-800" /> : <Menu size={24} className="text-gray-800" />}
        </button>
        <h1 className="text-2xl font-bold text-gray-800 md:pl-72">Bienvenido</h1>
      </div>

      

      {/* Contenedor de balance y logout */}
      <div className="flex items-center space-x-4">
        {/* Balance de Ducks visible siempre */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-200 via-yellow-100 to-white border border-yellow-300 rounded-full px-4 py-1 shadow-sm">
          <span className="text-base font-semibold text-yellow-800">
            {ducks !== null ? ducks.toLocaleString("de-DE") : '...'}
          </span>
          <div className="w-8 h-8 p-1 bg-white rounded-full flex items-center justify-center shadow">
            <img src={DuckIcon} alt="Icono de patos" className="w-6 h-6" />
          </div>
        </div>

        {/* Botón de logout */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors"
        >
          <LogOut size={24} className="text-[#ff204e]" />
          <span className="font-medium text-gray-700 hidden md:inline">Cerrar sesión</span>
        </button>
      </div>

      {/* Menú lateral móvil */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-4 transition-transform transform translate-x-0 md:hidden">
          <button className="absolute top-4 right-4" onClick={() => setMenuOpen(false)}>
            <X size={24} className="text-gray-800" />
          </button>
          <nav className="mt-8 space-y-4">
            <a href="#" className="block text-gray-700 hover:text-[#ff204e] transition">Inicio</a>
            <a href="#" className="block text-gray-700 hover:text-[#ff204e] transition">Perfil</a>
            <a href="#" className="block text-gray-700 hover:text-[#ff204e] transition">Ajustes</a>
            <button onClick={handleLogout} className="text-gray-700 hover:text-[#ff204e] transition">
              Cerrar sesión
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
