import type React from "react";
import { useState } from "react";
import { Plus } from "lucide-react";
import Sidebar from "../Sidebar";
import PaymentForm from "./PaymentForm";
import PaymentList from "./PaymentList";
import usePaymentMethods from "../../../hooks/bashboard/usePaymentMethods";

export function PaymentMethods() {
  const {
    paymentMethods, // Esto ya contiene los métodos de pago
    editingMethod,
    formData,
    imageSelected,
    formError,
    institutionOptions,
    accountTypes,
    setFormData,
    setImageSelected,
    setEditingMethod,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    toggleActive,
    editPaymentMethod,
    deletePaymentMethod,
  } = usePaymentMethods();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar fijo en pantallas grandes */}
      <Sidebar />

      {/* Contenido principal con margen izquierdo */}
      <div className="flex-1 p-6 w-full md:ml-72 md:pl-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
          Medios de Pago
        </h2>

        <PaymentForm
          formData={formData}
          imageSelected={imageSelected}
          formError={formError}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          editingMethod={editingMethod}
          institutionOptions={institutionOptions}
          accountTypes={accountTypes}
        />

        <div className="mt-4">
        <PaymentList
            shopData={{ methods: paymentMethods }} 
            toggleActive={toggleActive}
            editPaymentMethod={editPaymentMethod}
            deletePaymentMethod={deletePaymentMethod}
          />
        </div>
      </div>
    </div>
  );
}

export default PaymentMethods;