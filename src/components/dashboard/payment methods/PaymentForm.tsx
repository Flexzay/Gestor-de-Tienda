import type React from "react";
import { Plus, CreditCard } from "lucide-react";

interface PaymentFormProps {
  formData: any;
  imageSelected: string | null;
  formError: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  editingMethod: any;
}

/**
 * Componente de formulario para agregar o editar métodos de pago.
 */
const PaymentForm: React.FC<PaymentFormProps> = ({
  formData,
  imageSelected,
  formError,
  handleInputChange,
  handleFileChange,
  handleSubmit,
  editingMethod,
}) => {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-6 w-full max-w-full px-4 sm:px-8">
      {/* Título del formulario */}
      <h3 className="text-xl font-semibold text-gray-800 text-center">
        {editingMethod ? "Editar Medio de Pago" : "Agregar Nuevo Medio de Pago"}
      </h3>

      {/* Mensaje de error */}
      {formError && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md text-center font-semibold border border-red-400">
          {formError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Campo: Nombre de la Cuenta */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Nombre de la Cuenta</label>
          <input
            name="name_account"
            value={formData.name_account}
            onChange={handleInputChange}
            placeholder="Ej: Cuenta Personal"
            className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Campo: Entidad Bancaria */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Entidad Bancaria</label>
          <input
            name="entidad"
            value={formData.entidad}
            onChange={handleInputChange}
            placeholder="Ej: Banco Nacional"
            className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Campo: Tipo de Cuenta */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Tipo de Cuenta</label>
          <select
            name="type_account"
            value={formData.type_account}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="Ahorros">Ahorros</option>
            <option value="Corriente">Corriente</option>
          </select>
        </div>

        {/* Campo: NIT/CC */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">NIT/CC</label>
          <input
            name="nit_cc"
            value={formData.nit_cc}
            onChange={handleInputChange}
            placeholder="Ej: 123456789"
            className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Campo: Número de Cuenta */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Número de Cuenta</label>
          <input
            name="account"
            value={formData.account}
            onChange={handleInputChange}
            placeholder="Ej: 1234567890"
            className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Campo: Link de Pago */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Link de Pago</label>
          <input
            name="link_payment"
            value={formData.link_payment}
            onChange={handleInputChange}
            placeholder="https://pago.com"
            type="url"
            className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Código QR */}
      <div className="flex flex-col items-center">
        <label className="block font-medium text-gray-700 mb-1">Código QR</label>
        <div className="w-36 h-36 flex items-center justify-center border rounded-lg overflow-hidden bg-gray-50">
          {imageSelected ? (
            <img src={imageSelected} alt="QR Code" className="w-full h-full object-cover" />
          ) : (
            <CreditCard size={48} className="text-gray-400" />
          )}
        </div>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="mt-2 text-sm text-gray-600 border p-2 rounded-md cursor-pointer"
        />
      </div>

      {/* Botón Guardar */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-3 bg-[#FF2C59] text-white rounded-lg hover:bg-[#ff204e] transition-colors duration-300 flex items-center justify-center shadow-md"
        >
          <Plus size={20} className="mr-2" />
          {editingMethod ? "Actualizar Medio de Pago" : "Guardar Medio de Pago"}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;