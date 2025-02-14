import React from "react";
import { useVerifyCode } from "../../hooks/login/useVerifyCode";
import domiduck from "../../assets/img/domiduck.svg";

const VerifyCodeComponent = () => {
  const {
    register,
    handleSubmit,
    errors,
    loading,
    invalidCode,
    message,
    onSubmit,
    backLogin,
  } = useVerifyCode();

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
          Verificar Código
        </h2>
        <p className="text-[#6B7280] text-lg text-center mb-6">
          Introduce el código enviado a tu número
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <div>
            <input
              type="text"
              {...register("pin", {
                required: "Código es requerido",
                pattern: {
                  value: /^[0-9]{4}$/,
                  message: "El código debe ser de 4 dígitos",
                },
              })}
              placeholder="1234"
              maxLength={4}
              inputMode="numeric"
              className={`block w-full px-5 py-4 text-[#2C2C54] bg-gray-100 border-2 border-[#FFC857] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#34D399] transition-all text-lg ${
                errors.pin ? "border-red-500" : ""
              }`}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length > 4) value = value.slice(0, 4);
                e.target.value = value;
              }}
            />
            {errors.pin && (
              <p className="mt-2 text-lg text-[#FF204E]">{errors.pin.message}</p>
            )}
          </div>

          {/* Código inválido */}
          {invalidCode && (
            <div className="bg-red-100 text-[#FF204E] px-4 py-3 rounded-md text-lg text-center">
              {message}
            </div>
          )}

          {/* Botón de verificar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-5 py-4 text-white text-lg font-bold bg-[#FF204E] rounded-xl hover:bg-[#d91b3c] transition-all transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Verificando..." : "Verificar Código"}
          </button>
        </form>

        {/* Cambiar número */}
        <div className="mt-5 text-lg">
          <button onClick={backLogin} className="text-[#FF204E] font-bold hover:underline">
            Cambiar número de teléfono
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCodeComponent;
