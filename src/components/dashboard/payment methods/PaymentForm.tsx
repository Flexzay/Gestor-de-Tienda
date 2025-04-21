import React, { useState } from "react";
import { Plus, CreditCard } from "lucide-react";
import { environment } from "../../../config/environmet";

// Utiliza esta función para convertir Base64 a archivo
const dataURLtoFile = (dataUrl: string, fileName: string) => {
  const arr = dataUrl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};

interface PaymentFormProps {
  formData: any;
  imageSelected: string | null;
  formError: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  editingMethod: any;
  institutionOptions: string[];
  accountTypes: string[];
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  formData,
  imageSelected,
  formError,
  handleInputChange,
  handleFileChange,
  handleSubmit,
  editingMethod,
  institutionOptions,
  accountTypes,
}) => {
  const isEfectivo = formData.entidad === "Efectivo";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-6 w-full max-w-full px-4 sm:px-8"
    >
      <h3 className="text-xl font-semibold text-gray-800 text-center">
        {editingMethod ? "Editar Medio de Pago" : "Agregar Nuevo Medio de Pago"}
      </h3>

      {formError && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md text-center font-semibold border border-red-400">
          {formError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Nombre de la cuenta */}
        {!isEfectivo && (
          <div>
            <label className="block font-medium text-gray-700 mb-1">Nombre de la Cuenta</label>
            <input
              name="name_account"
              value={formData.name_account}
              onChange={handleInputChange}
              placeholder="Ej: Cuenta Personal"
              className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              disabled={isEfectivo}
              required={!isEfectivo}
            />
          </div>
        )}

        {/* Entidad */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Entidad Bancaria</label>
          <select
            name="entidad"
            value={formData.entidad}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Selecciona una entidad</option>
            {institutionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Tipo de cuenta */}
        {!isEfectivo && (
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
              {accountTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* NIT / CC */}
        {!isEfectivo && (
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
        )}
      </div>

      {/* Número de cuenta y Link de pago */}
      {!isEfectivo && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
      )}

      {/* QR */}
      {!isEfectivo && (
        <div className="flex flex-col items-center">
          <label className="block font-medium text-gray-700 mb-1">Código QR</label>
          <div className="w-36 h-36 flex items-center justify-center border rounded-lg overflow-hidden bg-gray-50">
            {imageSelected ? (
              <img
                src={imageSelected} 
                alt="Código QR"
                className="w-full h-full object-cover"
              />
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
      )}

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
