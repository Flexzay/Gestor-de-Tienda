import type React from "react";
import { useState } from "react";
import { Plus } from "lucide-react";
import Sidebar from "../Sidebar";
import PaymentForm from "./PaymentForm";
import PaymentList from "./PaymentList";
import usePaymentMethods from "../../../hooks/bashboard/usePaymentMethods";
import type { PaymentMethod } from "../../../interface/paymentMethod";

/**
 * Componente principal para la gestión de métodos de pago.
 * Permite agregar, editar, eliminar y activar/desactivar métodos de pago.
 */
export function PaymentMethods() {
  // Hook personalizado que maneja la lógica de los métodos de pago
  const {
    paymentMethods, // Lista de métodos de pago disponibles
    editingMethod, // Método de pago que se está editando actualmente
    formData, // Datos del formulario de métodos de pago
    imageSelected, // Imagen seleccionada para el método de pago
    formError, // Errores en el formulario de métodos de pago
    setFormData, // Función para actualizar los datos del formulario
    setImageSelected, // Función para actualizar la imagen seleccionada
    setEditingMethod, // Función para establecer el método de pago en edición
    handleInputChange, // Maneja los cambios en los campos del formulario
    handleFileChange, // Maneja la selección de archivos (imagen)
    handleSubmit, // Maneja el envío del formulario
    toggleActive, // Activa o desactiva un método de pago
    editPaymentMethod, // Establece un método de pago en modo edición
    deletePaymentMethod, // Elimina un método de pago
  } = usePaymentMethods();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Barra lateral de navegación */}
      <Sidebar />
      
      <div className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
        {/* Título principal de la sección */}
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Medios de Pago</h2>

        {/* Formulario para agregar o editar métodos de pago */}
        <PaymentForm
          formData={formData}
          imageSelected={imageSelected}
          formError={formError}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          editingMethod={editingMethod}
        />

        {/* Lista de métodos de pago existentes */}
        <div className="mt-4">
          <PaymentList
            paymentMethods={paymentMethods}
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
