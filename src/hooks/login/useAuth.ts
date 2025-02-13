import { useState } from "react";
import { authService } from "../../Services/auth.service";
import { useNavigate } from "react-router-dom"; // Para redirigir

function useLogin() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook para navegación

  function validatePhone(phone: string) {
    return /^3\d{9}$/.test(phone);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!validatePhone(phone)) {
      setError("Introduzca un número de celular válido");
      return;
    }

    setLoading(true);
    const response = await authService.login(phone);

    if (response.status === 200) {
      localStorage.setItem("phone", phone); // Guardamos el teléfono temporalmente
      navigate("/verify-code"); // Redirigir a la verificación del código
    } else {
      setError("Número de celular inválido o no tienes tienda");
    }

    setLoading(false);
  }

  return {
    phone,
    setPhone,
    error,
    loading,
    handleSubmit,
  };
}

export default useLogin;
