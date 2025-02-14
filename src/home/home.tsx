import React from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/login/useAuth"

function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // Verificamos si está logueado
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-3xl sm:mx-auto"> {/* Aumenté el max-width */}
        {/* Fondo degradado con color personalizado */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff204e] to-[#ff204e] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-3xl font-semibold text-center">Gestión de Tiendas</h1> {/* Aumenté el tamaño del título */}
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>Bienvenido a tu panel de gestión de tiendas. Aquí podrás:</p>
                <ul className="list-disc space-y-2">
                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                      {/* Icono con color personalizado */}
                      <svg className="flex-shrink-0 h-5 w-5 text-[#ff204e]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="ml-2">Administrar inventario</p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                      {/* Icono con color personalizado */}
                      <svg className="flex-shrink-0 h-5 w-5 text-[#ff204e]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="ml-2">Ver estadísticas de ventas</p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                      {/* Icono con color personalizado */}
                      <svg className="flex-shrink-0 h-5 w-5 text-[#ff204e]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="ml-2">Gestionar pedidos</p>
                  </li>
                </ul>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <p>¿Listo para comenzar?</p>
                {/* Botón más grande */}

                {!isLoggedIn ? (
                  <button
                    onClick={() => navigate('/login')}
                    className="mt-6 bg-[#ff204e] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#84001a] transition-colors text-xl"
                  >
                    Ir a Iniciar Sesión 🚀

                    {/* Botón más grande */}
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="mt-6 bg-[#ff204e] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#84001a] transition-colors text-xl"
                  >
                    Ir al Panel de Gestión 📊
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
