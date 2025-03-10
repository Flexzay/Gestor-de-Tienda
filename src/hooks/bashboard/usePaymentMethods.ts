import { useState } from "react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingMethod) {
      setPaymentMethods(paymentMethods.map((method) => (method.id === editingMethod.id ? { ...method, ...formData } : method)));
      setEditingMethod(null);
    } else {
      const newMethod: PaymentMethod = {
        id: Date.now(),
        ...formData,
        status: true,
      };
      setPaymentMethods([...paymentMethods, newMethod]);
    }

    setFormData({
      name_account: "",
      entidad: "",
      type_account: "",
      nit_cc: "",
      account: "",
      link_payment: "",
    });
    setImageSelected(null);
  };

  const toggleActive = (method: PaymentMethod) => {
    setPaymentMethods(paymentMethods.map((m) => (m.id === method.id ? { ...m, status: !m.status } : m)));
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

  const deletePaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.filter((m) => m.id !== id));
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
