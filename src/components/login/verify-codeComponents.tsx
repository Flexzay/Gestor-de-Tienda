import React, { useState, useEffect } from "react";
import { Lock, Loader2, Ban } from "lucide-react";
import { useVerifyCode } from "../../hooks/login/useVerifyCode";
import domiduck from "../../assets/img/domiduck.svg";

export function VerifyCodeComponent() {
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

  const [showAlert, setShowAlert] = useState(false);
  const phoneNumber = localStorage.getItem("phone") || "";

  useEffect(() => {
    if (!invalidCode) {
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  }, [invalidCode]);

  return (
    <div className="flex min-h-screen">
      {/* Sección izquierda con imagen */}
      <div className="hidden md:flex items-center justify-center w-1/2 bg-[#FF2C59] relative">
        <div className="text-center p-10 text-white">
          <img src={domiduck} alt="DomiDuck" className="w-32 mx-auto animate-fadeIn" />
          <h2 className="text-4xl font-bold mt-5 animate-slideIn">Verificación</h2>
          <p className="text-white text-opacity-90 mt-2 animate-slideIn delay-200">
            Introduce el código enviado a tu número
          </p>
        </div>
      </div>

      {/* Sección derecha con formulario */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10">
        <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md animate-fadeIn">
          
          {/* Alerta de código inválido (Ahora está arriba del título) */}
          {showAlert && (
            <div className="flex items-center bg-red-100 text-[#F21628] px-4 py-3 rounded-md text-lg mb-4">
              <Ban className="w-5 h-5 mr-2" />
              <span>{message}</span>
              <button onClick={() => setShowAlert(false)} className="ml-auto text-[#F21628] hover:text-red-700">
                ✖
              </button>
            </div>
          )}

          {/* Título y descripción */}
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Verificar Código</h2>
          <p className="text-gray-500 text-center mb-6">Introduce el código de 4 dígitos</p>

          {/* Mostrar número de teléfono ingresado */}
          <p className="text-gray-700 text-center mb-4 font-semibold">Código enviado a: {phoneNumber}</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-1">Código</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                  className={`w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#FF2C59] focus:outline-none transition-all ${
                    errors.pin ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.pin && <p className="text-red-500 text-sm mt-2">{errors.pin.message}</p>}
            </div>

            {/* Botón de verificar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-lg font-semibold text-white bg-[#FF2C59] rounded-lg shadow-md transition-all hover:bg-[#e0244d] hover:shadow-lg hover:scale-105 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-6 w-6 mr-2" />
                  Verificando...
                </>
              ) : (
                "Verificar Código"
              )}
            </button>
          </form>

          {/* Cambiar número */}
          <div className="mt-5 text-lg text-center">
            <button onClick={backLogin} className="text-[#FF2C59] font-bold hover:underline">
              Cambiar número de teléfono
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyCodeComponent;
