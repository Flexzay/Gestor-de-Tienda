
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/login/useAuth";

function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-4xl"> 
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff204e] to-[#ff204e] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-white shadow-lg sm:rounded-3xl p-6 sm:p-12 lg:p-16">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl font-semibold sm:text-4xl">Gestión de Tiendas</h1>
            <p className="mt-4 text-gray-700 text-base sm:text-lg">
              Bienvenido a tu panel de gestión de tiendas. Aquí podrás:
            </p>
            <ul className="mt-6 space-y-3 text-left">
              {[
                "Administrar inventario",
                "Ver estadísticas de ventas",
                "Gestionar pedidos",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <svg className="h-5 w-5 text-[#ff204e]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-gray-700 text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="font-bold text-lg">¿Listo para comenzar?</p>
              <button
                onClick={() => navigate(isLoggedIn ? '/dashboard' : '/login')}
                className="mt-6 w-full bg-[#ff204e] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#84001a] transition-colors text-lg sm:text-xl"
              >
                {isLoggedIn ? "Ir al Panel de Gestión " : "Ir a Iniciar Sesión "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
