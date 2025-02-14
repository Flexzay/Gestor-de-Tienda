import { authService } from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


function useLogin() {
  const [phone, setPhone] = useState<string>(""); // Asegúrate de tipar el estado
  const [error, setError] = useState<string>(""); // Tipado de error
  const [loading, setLoading] = useState<boolean>(false); // Tipado de loading
  const navigate = useNavigate();

  function validatePhone(phone: string): boolean {
    return /^3\d{9}$/.test(phone);  // Validación de teléfono
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setError("");

    if (!validatePhone(phone)) {
      setError("Introduzca un número de celular válido");
      return;
    }

    setLoading(true);
    const response = await authService.login(phone);

    if (response.status === 200) {
      localStorage.setItem("phone", phone);  // Guardar el teléfono
      localStorage.setItem("userId", response.data.id);  // guardar el ID
      navigate("/verify-code"); // Redirigir a la pantalla de verificación de código
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
