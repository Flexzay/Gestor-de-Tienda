import React from "react";
import useLogin from "../../hooks/login/useLogin";
import domiduck from "../../assets/img/domiduck.svg";

function LoginForm() {
  const { phone, setPhone, error, loading, handleSubmit } = useLogin();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-4xl w-full">
        {/* apartado de la img */}
        <div className="md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-blue-500 to-purple-600">
          <img
            src={domiduck}
            alt="DomiDuck mascot"
            className="w-48 md:w-64 lg:w-72 max-h-72 animate-bounce-slow"
          />
        </div>

        {/* Formulario */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Bienvenido a DomiDuck
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Inicia sesión para gestionar tu Tienda
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                Número de celular
              </label>
              <input
                type="text"
                value={phone}
                maxLength={10}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Ingresa tu número"
                className="block w-full px-4 py-3 text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ""); // renplaza todo caracter no numerico
                  if (value.length > 10) {
                    value = value.slice(0, 10); // Máximo 10 dígitos
                  }
                  setPhone(value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "-" || e.key === "e") e.preventDefault(); // Bloquea negativos y caracteres no numéricos
                }}
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 transition-all"
            >
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
