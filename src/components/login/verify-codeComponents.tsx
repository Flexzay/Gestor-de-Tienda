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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-4xl w-full">
        {/* Imagen */}
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
            Verificar código
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Introduce el código enviado a tu teléfono
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <div>
              <input
                type="text"
                {...register("pin", {
                  required: "Código es requerido",
                  pattern: {
                    value: /^[0-9]{4}$/,  // Validación de 4 dígitos
                    message: "El código debe ser un número de 4 dígitos",
                  },
                })}
                id="pin"
                className={`w-full px-4 py-3 text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.pin ? "border-red-500" : ""}`}
                placeholder="1234"
                maxLength={4}
                inputMode="numeric"
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  if (value.length > 4) {
                    value = value.slice(0, 4);
                  }
                  e.target.value = value;
                }}
              />
            </div>

            {/* Mensaje de error */}
            {errors.pin && <p className="text-center text-sm text-red-500">{errors.pin.message}</p>}

            {/* Mensaje de código inválido */}
            {invalidCode && (
              <div className="bg-red-100 text-red-700 px-3 py-1 rounded relative mb-4 text-center" role="alert">
                {message}
              </div>
            )}

            {/* Botón para enviar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verificando..." : "Verificar Código"}
            </button>
          </form>

          {/* Botón para cambiar el número de teléfono */}
          <div className="mt-6 text-center">
            <button className="text-blue-500 hover:underline font-medium" onClick={backLogin}>
              Cambiar el número de teléfono
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCodeComponent;
