import React from "react";
import useLogin from "../../hooks/login/useAuth";
import domiduck from "../../assets/img/domiduck.svg";

function LoginForm() {
  

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
            Bienvenido a Dashboard
          </h2>
          <p className="text-gray-600 text-center mt-2">
              dashboard
          </p>

          
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
