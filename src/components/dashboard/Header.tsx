import { Menu, LogOut, X, Truck, Phone, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { authService } from "../../Services/auth.service";
import { shopService } from "../../Services/shop.service";
import DuckIcon from "../../assets/img/ducks.svg";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ducks, setDucks] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await shopService.getBalance();
      setDucks(balance);
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 0);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  };

  const handleGuardar = () => {
    console.log({ telefono }); // Aquí podrías llamar a tu servicio
    setModalOpen(false);
    setTelefono("");
  };

  return (
    <>
      <header className="bg-white shadow-md p-4 flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} className="text-gray-800" /> : <Menu size={24} className="text-gray-800" />}
          </button>
          <h1 className="text-2xl font-bold text-gray-800 md:pl-72">Bienvenido</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Botón que abre el modal */}
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-[#ff204e] text-white px-4 py-2 rounded-full hover:bg-[#ff3b60] transition-all"
          >
            <Truck size={20} />
            <span className="hidden md:inline">Solicitar Domiciliario</span>
          </button>

          {/* Balance */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-200 via-yellow-100 to-white border border-yellow-300 rounded-full px-4 py-1 shadow-sm">
            <span className="text-base font-semibold text-yellow-800">
              {ducks !== null ? ducks.toLocaleString("de-DE") : '...'}
            </span>
            <div className="w-8 h-8 p-1 bg-white rounded-full flex items-center justify-center shadow">
              <img src={DuckIcon} alt="Icono de patos" className="w-6 h-6" />
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors"
          >
            <LogOut size={24} className="text-[#ff204e]" />
            <span className="font-medium text-gray-700 hidden md:inline">Cerrar sesión</span>
          </button>
        </div>

        {/* Menú móvil */}
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

      /* Modal for Delivery Request */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur effect */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 z-10 overflow-hidden animate-fadeIn">
            {/* Header */}
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Solicitar Domicilio</h2>
              <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">
                Al solicitar un domicilio, estás pidiendo que alguien recoja el pedido del cliente. Asegúrate de tener
                la dirección correcta y los detalles del pedido.
              </p>
            </div>

            {/* Body */}
            <div className="p-5">
              <div className="mb-4">
                <label htmlFor="telefono" className="block font-medium text-gray-700 mb-1.5">
                  Número de Teléfono
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#ff204e] focus-within:border-[#ff204e] transition-all">
                  <span className="p-2.5 text-gray-500 bg-gray-50 border-r border-gray-300">
                    <Phone className="h-5 w-5" />
                  </span>
                  <input
                    id="telefono"
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Ingrese su número de teléfono"
                    className="flex-1 p-2.5 outline-none text-gray-800"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-gray-100 flex justify-end space-x-3">
              <button
                onClick={() => setModalOpen(false)}
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <X className="h-4 w-4" />
                Cancelar
              </button>
              <button
                onClick={handleGuardar}
                className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
              >
                <Save className="h-4 w-4" />
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
