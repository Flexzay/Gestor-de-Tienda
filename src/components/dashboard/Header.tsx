import { Bell, Search, Menu, LogOut, X } from "lucide-react";
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
      {/* Menú móvil */}
      <div className="flex items-center space-x-4">
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} className="text-gray-800" /> : <Menu size={24} className="text-gray-800" />}
        </button>
        <h1 className="text-2xl font-bold text-gray-800 pl-4">Bienvenido</h1>
      </div>

      {/* Barra de búsqueda en pantallas grandes */}
      <div className="hidden md:block w-full max-w-md relative">
        <input
          type="text"
          placeholder="Buscar..."
          className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff204e] focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {/* Contenedor de iconos y perfil */}
      <div className="flex items-center space-x-4">
        {/* Contador de Ducks */}
        {ducks !== null && ducks > 0 && (
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
            <span className="text-lg font-bold text-gray-900">{ducks.toLocaleString("de-DE")}</span>
            <img src={DuckIcon} alt="Icono de patos" className="w-8 h-8 ml-2" />
          </div>
        )}

        {/* Icono de notificaciones */}
        <button className="relative p-2 text-gray-600 hover:text-[#ff204e] transition-colors">
          <Bell size={24} />
          <span className="absolute top-0 right-0 h-4 w-4 bg-[#ff204e] rounded-full text-xs text-white flex items-center justify-center">
            8
          </span>
        </button>

        {/* Botón de logout */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors"
        >
          <LogOut size={24} className="text-[#ff204e]" />
          <span className="font-medium text-gray-700 hidden md:inline">Cerrar sesión</span>
        </button>
      </div>

      {/* Menú lateral en móviles */}
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
