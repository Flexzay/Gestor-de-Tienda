import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormInput } from "../../interface/verifyCode";
import { authService } from "../../Services/auth.service";

export const useVerifyCode = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [invalidCode, setInvalidCode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
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
      setMessage("Error: No se encontró un usuario válido. Inicia sesión nuevamente.");
      setInvalidCode(true);
      setLoading(false);
      return;
    }
  
    try {
      const response = await authService.verifyCode({
        userId: Number(userId), // Convertimos a número
        code: data.pin,
      });
  
      console.log("📩 Respuesta de verifyCode:", response);
  
      if (response.status === 200 && response.data?.data?.token) {
        console.log("✅ Código válido, redirigiendo...");
  
        localStorage.setItem("token", response.data.data.token);
        console.log("🔑 Token guardado en localStorage:", response.data.data.token);
  
        setTimeout(() => {
          console.log("🚀 Intentando `navigate()`...");
          navigate("/dashboard", { replace: true });
        }, 500);
      } else {
        console.warn("⚠️ Código inválido o error en la respuesta:", response);
        setMessage("Código inválido. Inténtalo de nuevo.");
        setInvalidCode(true);
      }
  
    } catch (err) {
      setMessage("Ocurrió un error al validar el código");
      setInvalidCode(true);
      console.error("❌ Error en verifyCode:", err);
    } finally {
      setLoading(false);
    }
  };


  const backLogin = () => {
    navigate("/login");
  };

  return {
    register,
    handleSubmit,
    errors,
    loading,
    invalidCode,
    message,
    onSubmit,
    backLogin,
  };
};



