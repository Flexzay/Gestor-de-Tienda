import { Menu, LogOut, X, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import { authService } from "../../Services/auth.service";
import { shopService } from "../../Services/shop.service";
import DuckIcon from "../../assets/img/ducks.svg";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ducks, setDucks] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

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
    <header className="bg-white shadow-md p-4 flex items-center justify-between w-full relative">
      {/* Menú móvil + Título */}
      <div className="flex items-center space-x-4">
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} className="text-gray-800" /> : <Menu size={24} className="text-gray-800" />}
        </button>
        <h1 className="text-2xl font-bold text-gray-800 md:pl-72">Bienvenido</h1>
      </div>

      {/* Contenedor de balance y logout */}
      <div className="flex items-center space-x-4">

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#ff204e] text-white px-4 py-2 rounded-full hover:bg-[#ff3b60] transition-all"
        >
          <Truck size={20} />
          <span className="hidden md:inline">Solicitar Domiciliario</span>
        </button>

        {/* Balance de Ducks */}
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

      {/* Modal para solicitar domiciliario */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-11/12 max-w-md animate-fade-in">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Solicitar Domiciliario</h2>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Nota:</strong> Tenga en cuenta que al solicitar un domiciliario debe tener la información del cliente completa, como ubicación y número de teléfono.
            </p>
            <label className="block mb-3">
              <span className="text-gray-700 font-medium">Número de Teléfono</span>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 10) setPhoneNumber(value);
                }}
                placeholder="Ej. 3001234567"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff204e]"
              />
            </label>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (phoneNumber.length === 10) {
                    alert(`Domiciliario solicitado para el número ${phoneNumber}`);
                    setShowModal(false);
                    setPhoneNumber('');
                  } else {
                    alert('Por favor ingrese un número válido de 10 dígitos.');
                  }
                }}
                className="px-4 py-2 bg-[#ff204e] text-white rounded-lg hover:bg-[#ff3b60] transition"
              >
                Confirmar solicitud
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
