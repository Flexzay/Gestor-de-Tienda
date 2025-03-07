import React from "react";
import { Phone, Loader2 } from "lucide-react";
import useLogin from "../../hooks/login/useLogin";
import domiduck from "../../assets/img/domiduck.svg";

function LoginForm() {
  const { phone, setPhone, error, loading, handleSubmit } = useLogin();

  return (
    <div className="flex min-h-screen">
      {/* Sección izquierda con imagen y fondo rojo */}
      <div className="hidden md:flex items-center justify-center w-1/2 bg-[#FF2C59] relative">
        <div className="text-center p-10 text-white">
          <img src={domiduck} alt="DomiDuck" className="w-32 mx-auto animate-fadeIn" />
          <h2 className="text-4xl font-bold mt-5 animate-slideIn">Bienvenido de nuevo</h2>
          <p className="text-white text-opacity-90 mt-2 animate-slideIn delay-200">
            Accede para gestionar tu tienda de manera rápida y sencilla.
          </p>
        </div>
      </div>

      {/* Sección derecha con formulario */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10">
        <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Iniciar Sesión</h2>
          <p className="text-gray-500 text-center mb-6">Ingresa tu número de celular para continuar</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-1">Número de celular</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={phone}
                  maxLength={10}
                  inputMode="numeric"
                  placeholder="Tu número de celular"
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#FF2C59] focus:outline-none transition-all"
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length > 10) value = value.slice(0, 10);
                    setPhone(value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") e.preventDefault();
                  }}
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {/* Botón principal en rojo */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-lg font-semibold text-white bg-[#FF2C59] rounded-lg shadow-md transition-all hover:bg-[#e0244d] hover:shadow-lg hover:scale-105 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-6 w-6 mr-2" />
                  Cargando...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default LoginForm;
