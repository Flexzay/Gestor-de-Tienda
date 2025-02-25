import { authService } from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function useLogin() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePhone = (phone: string): boolean => /^3\d{9}$/.test(phone);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError("");

    if (!validatePhone(phone)) {
      setError("Introduzca un número de celular válido");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login(phone);
      const userId = response.data?.data?.id;

      if (response.status === 200 && userId) {
        localStorage.setItem("phone", phone);
        localStorage.setItem("userId", String(userId));
        navigate("/verify-code");
      } else {
        setError(response.message || "Número de celular inválido o no tienes tienda");
      }
    } catch (error) {
      setError("Error en la autenticación. Inténtalo de nuevo.");
      console.error("Error en login:", error);
    } finally {
      setLoading(false);
    }
  };

  return { phone, setPhone, error, loading, handleSubmit };
}

export default useLogin;
