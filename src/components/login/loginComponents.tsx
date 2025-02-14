import React from "react";
import useLogin from "../../hooks/login/useLogin";
import domiduck from "../../assets/img/domiduck.svg";

function LoginForm() {
  const { phone, setPhone, error, loading, handleSubmit } = useLogin();

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-6">
      <div className="bg-white border-4 border-[#FFC857] rounded-3xl shadow-xl flex flex-col items-center max-w-lg w-full p-10">
        
        {/* Logo */}
        <img
          src={domiduck}
          alt="DomiDuck"
          className="w-36 animate-bounce mb-5"
        />

        {/* Título */}
        <h2 className="text-4xl font-extrabold text-[#2C2C54] text-center mb-3">
          Iniciar Sesión
        </h2>
        <p className="text-[#6B7280] text-lg text-center mb-6">
          Accede para gestionar tu tienda 🛒
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div>
            <label className="block text-[#2C2C54] font-semibold mb-1 text-lg">
              Número de celular
            </label>
            <input
              type="text"
              value={phone}
              maxLength={10}
              inputMode="numeric"
              placeholder="Ingresa tu número"
              className="block w-full px-5 py-4 text-[#2C2C54] bg-gray-100 border-2 border-[#FFC857] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#34D399] transition-all"
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length > 10) value = value.slice(0, 10);
                setPhone(value);
              }}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e") e.preventDefault();
              }}
            />
            {error && <p className="mt-2 text-lg text-[#FF204E]">{error}</p>}
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-5 py-4 text-white text-lg font-bold bg-[#FF204E] rounded-xl hover:bg-[#d91b3c] transition-all transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        
      </div>
    </div>
  );
}

export default LoginForm;
