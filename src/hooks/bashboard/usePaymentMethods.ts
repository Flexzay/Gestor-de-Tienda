import { useState, useEffect } from "react";
import PaymentMethodsService from "../../Services/paymentMethods.service";
import type { PaymentMethod } from "../../interface/paymentMethod";

const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [formData, setFormData] = useState({
    name_account: "",
    entidad: "",
    type_account: "",
    nit_cc: "",
    account: "",
    link_payment: "",
  });
  const [imageSelected, setImageSelected] = useState<string | null>(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const methods = await PaymentMethodsService.getPaymentMethods();
      setPaymentMethods(methods);
    } catch (error) {
      console.error("Error al obtener los métodos de pago", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.account && !formData.link_payment && !imageSelected) {
      setFormError("Debes proporcionar al menos uno de los siguientes: Número de Cuenta, Link de Pago o Código QR.");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingMethod) {
        await PaymentMethodsService.updatePaymentMethod(editingMethod.id, formData);
      } else {
        await PaymentMethodsService.createPaymentMethod(formData);
      }
      fetchPaymentMethods();
      resetForm();
    } catch (error) {
      console.error("Error al guardar el método de pago", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name_account: "",
      entidad: "",
      type_account: "",
      nit_cc: "",
      account: "",
      link_payment: "",
    });
    setImageSelected(null);
    setEditingMethod(null);
  };

  const toggleActive = async (method: PaymentMethod) => {
    try {
      await PaymentMethodsService.changeStatusPaymentMethod(method.id);
      fetchPaymentMethods();
    } catch (error) {
      console.error("Error al cambiar el estado del método de pago", error);
    }
  };

  const editPaymentMethod = (method: PaymentMethod) => {
    setEditingMethod(method);
    setFormData({
      name_account: method.name_account,
      entidad: method.entidad,
      type_account: method.type_account,
      nit_cc: method.nit_cc,
      account: method.account || "",
      link_payment: method.link_payment || "",
    });
    setImageSelected(method.qr_code || null);
  };

  const deletePaymentMethod = async (id: number) => {
    try {
      await PaymentMethodsService.deletePaymentMethod(id);
      fetchPaymentMethods();
    } catch (error) {
      console.error("Error al eliminar el método de pago", error);
    }
  };

  return {
    paymentMethods,
    editingMethod,
    formData,
    imageSelected,
    formError,
    setFormData,
    setImageSelected,
    setEditingMethod,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    toggleActive,
    editPaymentMethod,
    deletePaymentMethod,
  };
};

export default usePaymentMethods;
