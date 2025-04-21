import { useState, useEffect } from "react";
import PaymentMethodsService from "../../Services/paymentMethods.service";
import type { PaymentMethod } from "../../interface/paymentMethod";
import { environment } from "../../config/environmet";

const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [institutionOptions, setInstitutionOptions] = useState<string[]>([]);
  const [accountTypes, setAccountTypes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name_account: "",
    entidad: "",
    type_account: "",
    nit_cc: "",
    account: "",
    link_payment: "",
  });
  const [imageSelected, setImageSelected] = useState<string | null>(null);
  const [isNewImage, setIsNewImage] = useState(false); // ✅ Nuevo estado
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetchPaymentMethods();
    fetchConfigurations();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const response = await PaymentMethodsService.getPaymentMethods();
      setPaymentMethods(response.data || []);
    } catch (error) {
      console.error("❌ Error al obtener métodos:", error);
    }
  };

  const fetchConfigurations = async () => {
    try {
      const config = await PaymentMethodsService.getConfigurations();
      setInstitutionOptions(config.data?.institutions || []);
      setAccountTypes(config.data?.types || []);
    } catch (error) {
      console.error("❌ Error al obtener configuraciones:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "entidad" && value === "Efectivo" ? { type_account: "EFECTIVO" } : {}),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSelected(reader.result as string);
        setIsNewImage(true); // ✅ Ahora funciona
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const isEfectivo = formData.entidad === "Efectivo";

    if (!formData.entidad) {
      setFormError("Debes seleccionar una entidad.");
      return false;
    }

    if (!isEfectivo && !formData.account && !formData.link_payment && !imageSelected) {
      setFormError("Debes proporcionar al menos Número de Cuenta, Link de Pago o Código QR.");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    console.log("✅ Enviando datos:", formData, imageSelected);
  
    const form = new FormData();
    form.append("entidad", formData.entidad);
    form.append("name_account", formData.name_account);
    form.append("type_account", formData.type_account);
    form.append("nit_cc", formData.nit_cc);
  
    if (formData.entidad !== "Efectivo") {
      if (formData.account) form.append("account", formData.account);
      if (formData.link_payment) form.append("link_payment", formData.link_payment);
  
      // Solo agregamos image_qr si es una imagen nueva
      if (imageSelected && imageSelected.startsWith("data:image/")) {
        try {
          const file = dataURLtoFile(imageSelected, "qr_code.png");
          form.append("image_qr", file);
          console.log("🖼️ QR agregado al FormData");
        } catch (err) {
          console.error("❌ Error al convertir base64 a archivo:", err);
        }
      } else {
        console.log("⚠️ QR no agregado: no hay imagen nueva o no es base64.");
      }
    }
  
    // Debug del FormData
    console.log("📦 FormData enviado:");
    for (let pair of form.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
  
    try {
      if (editingMethod) {
        await PaymentMethodsService.updatePaymentMethod(editingMethod.id.toString(), form);
      } else {
        await PaymentMethodsService.createPaymentMethod(form);
      }
  
      fetchPaymentMethods();
      resetForm();
    } catch (error) {
      setFormError("Hubo un problema al guardar el método de pago.");
      console.error("❌ Error al guardar:", error);
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
    setFormError("");
    setIsNewImage(false); // ✅ Reiniciar estado
  };

  const toggleActive = async (method: PaymentMethod) => {
    try {
      await PaymentMethodsService.changeStatusPaymentMethod(method.id);
      fetchPaymentMethods();
    } catch (error) {
      console.error("❌ Error al cambiar estado:", error);
    }
  };

  const editPaymentMethod = (method: PaymentMethod) => {
    setEditingMethod(method);
    setFormData({
      name_account: method.name_account || "",
      entidad: method.entidad,
      type_account: method.type_account || "",
      nit_cc: method.nit_cc || "",
      account: method.account || "",
      link_payment: method.link_payment || "",
    });
    setImageSelected(
      method.image_qr ? `${environment.s3Storage}${method.image_qr}` : null
    );
    setIsNewImage(false); // ✅ No es imagen nueva
  };

  const deletePaymentMethod = async (id: number) => {
    try {
      await PaymentMethodsService.deletePaymentMethod(id);
      fetchPaymentMethods();
    } catch (error) {
      console.error("❌ Error al eliminar método:", error);
    }
  };

  return {
    paymentMethods,
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
  };
};

export default usePaymentMethods;

// ✅ Conversión de base64 a archivo
const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(",");
  if (arr.length < 2) throw new Error("Formato de base64 no válido");

  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
};
