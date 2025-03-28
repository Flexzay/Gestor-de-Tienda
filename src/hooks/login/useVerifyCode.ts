import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormInput } from "../../interface/verifyCode";
import { authService } from "../../Services/auth.service";

export const useVerifyCode = () => {
  const [loading, setLoading] = useState(false);
  const [invalidCode, setInvalidCode] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      pin: "",
      phone: localStorage.getItem("phone") || "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    setInvalidCode(false);

    const userId = localStorage.getItem("userId");

    if (!userId || isNaN(Number(userId))) {
      setMessage("No se encontró un usuario válido. Inicia sesión nuevamente.");
      setInvalidCode(true);
      setLoading(false);
      return;
    }

    try {
      const response = await authService.verifyCode({
        userId: Number(userId),
        code: data.pin,
      });

      if (response.status === 200 && response.data?.data?.token) {
        const { token, shop } = response.data.data;
      
        localStorage.setItem("token", token);
        if (shop?.id) localStorage.setItem("shop_id", String(shop.id));
        if (shop?.name) localStorage.setItem("shop_name", shop.name);
        if (shop?.image) localStorage.setItem("shop_image", shop.image);
      
        console.log("📌 Guardado en localStorage:", { shop });
      
        setTimeout(() => navigate("/dashboard", { replace: true }), 500);
      }
       else {
        setMessage("Código inválido. Inténtalo de nuevo.");
        setInvalidCode(true);
      }
    } catch (error) {
      setMessage("Ocurrió un error al validar el código.");
      setInvalidCode(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    loading,
    invalidCode,
    message,
    onSubmit,
    backLogin: () => navigate("/login"),
  };
};
