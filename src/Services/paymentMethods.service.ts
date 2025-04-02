
import { environment } from '../config/environmet';

const shopId = localStorage.getItem('shopId') || ''; // Obtener el shopId de localStorage

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error en la solicitud');
  }
  return await response.json();
};

const PaymentMethodsService = {
  // Obtener configuraciones de pago
  getConfigurations: async () => {
    try {
      const response = await fetch(`${environment.baseUrl}/methods/config`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al obtener configuraciones:', error);
      throw error;
    }
  },

  // Crear un método de pago
  createPaymentMethod: async (paymentMethod) => {
    try {
      const response = await fetch(`${environment.baseUrl}/shop/${shopId}/methods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: paymentMethod, // Asegúrate de que esto sea un FormData adecuado
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al crear el método de pago:', error);
      throw error;
    }
  },

  // Obtener métodos de pago
  getPaymentMethods: async () => {
    try {
      const response = await fetch(`${environment.baseUrl}/shop/${shopId}/methods`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al obtener métodos de pago:', error);
      throw error;
    }
  },

  // Cambiar el estado de un método de pago
  changeStatusPaymentMethod: async (paymentMethodId) => {
    try {
      const response = await fetch(`${environment.baseUrl}/shop/${shopId}/methods/${paymentMethodId}/status`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al cambiar el estado del método de pago:', error);
      throw error;
    }
  },

  // Eliminar un método de pago
  deletePaymentMethod: async (paymentMethodId) => {
    try {
      const response = await fetch(`${environment.baseUrl}/shop/${shopId}/methods/${paymentMethodId}`, {
        method: 'DELETE',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al eliminar el método de pago:', error);
      throw error;
    }
  },

  // Actualizar un método de pago
  updatePaymentMethod: async (paymentMethodId, paymentMethod) => {
    try {
      const response = await fetch(`${environment.baseUrl}/shop/${shopId}/methods/${paymentMethodId}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: paymentMethod, // Asegúrate de que esto sea un FormData adecuado
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al actualizar el método de pago:', error);
      throw error;
    }
  },
};

export default PaymentMethodsService;
