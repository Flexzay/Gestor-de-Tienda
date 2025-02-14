import { useState } from "react";
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
  
    const userId = localStorage.getItem("userId"); // Recuperamos el userId
  
    try {
      const response = await authService.verifyCode({
        userId: userId || "",
        code: data.pin,
      });
  
      if (response.status === 200) {
        console.log("✅ Código válido, redirigiendo...");
        navigate("/dashboard");
      } else {
        setMessage("Código inválido");
        setInvalidCode(true);
      }
    } catch (err) {
      setMessage("Ocurrió un error al validar el código");
      setInvalidCode(true);
      console.error(err);
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
