import { Search, UserPlus, Calendar, Loader } from "lucide-react";
import { useFormOnsite } from "../../../hooks/bashboard/useFromOnsite";

interface ClientSearchFormProps {
  onUserFound: (userId: number) => void;
}

const ClientSearchForm = ({ onUserFound }: ClientSearchFormProps) => {
  const {
    clientForm,
    showRegisterButton,
    alertMessage,
    alertType,
    loading,
    handleInputChange,
    resetForm,
    searchClient,
    registerUser
  } = useFormOnsite({ onUserFound });

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Buscar Cliente</h2>
        <p className="text-sm text-gray-600 mt-1">
          Busque un cliente por número telefónico o registre uno nuevo.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Teléfono */}
        <div className="space-y-2">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Teléfono
          </label>
          <div className="flex">
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={clientForm.phoneNumber}
              onChange={handleInputChange}
              placeholder="Ingrese número telefónico"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              type="button"
              onClick={searchClient}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors disabled:opacity-70"
            >
              {loading ? (
                <Loader className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Buscar
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Ingrese el número telefónico del cliente
          </p>
        </div>

        {/* Nombre y Fecha de nacimiento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={clientForm.name}
              onChange={handleInputChange}
              placeholder="Nombre completo"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="birthDate"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha de Nacimiento
            </label>
            <div className="relative">
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                value={clientForm.birthDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Alertas */}
        {alertMessage && (
          <div
            className={`p-4 rounded-md text-sm border ${
              alertType === "error"
                ? "bg-red-50 text-red-800 border-red-200"
                : "bg-green-50 text-green-800 border-green-200"
            }`}
          >
            {alertMessage}
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
        <button
          onClick={resetForm}
          className="text-sm text-gray-600 hover:underline"
        >
          Limpiar
        </button>

        {showRegisterButton && (
          <button
            onClick={registerUser}
            disabled={loading}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70"
          >
            {loading ? (
              <Loader className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <UserPlus className="h-4 w-4 mr-2" />
            )}
            Registrar Cliente
          </button>
        )}
      </div>
    </div>
  );
};

export default ClientSearchForm;
