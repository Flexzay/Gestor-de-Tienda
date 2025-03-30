import { Bell, Search, Menu, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { authService } from "../../Services/auth.service";
import { membership } from "../../Services/membership.service"; // Importar servicio
import DuckIcon from "../../assets/img/ducks.svg";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ducks, setDucks] = useState<number | null>(null);


  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await membership.getBalance();
      setDucks(balance);
    };

    fetchBalance();

    const interval = setInterval(fetchBalance, 30000); // Actualizar cada 30s
    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center w-full">
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} className="text-gray-800" />
        </button>
        <h1 className="text-2xl pl-3.5 font-bold text-gray-800">Bienvenido</h1>
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
        {/* Contador de Ducks */}
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
  <span className="text-lg font-bold text-gray-900">
    {ducks !== null ? ducks.toLocaleString("de-DE") : "--"}
  </span>
  <img src={DuckIcon} alt="Icono de patos" className="w-8 h-8 ml-2" />
</div>


        <button className="relative p-2 text-gray-600 hover:text-[#ff204e] transition-colors">
          <Bell size={24} />
          <span className="absolute top-0 right-0 h-4 w-4 bg-[#ff204e] rounded-full text-xs text-white flex items-center justify-center">
            8
          </span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors"
        >
          <LogOut size={24} className="text-[#ff204e]" />
          <span className="font-medium text-gray-700 hidden md:inline">Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
