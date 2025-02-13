import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormInput } from "../../interface/verifyCode";
import { authService } from "../../Services/auth.service"
export const useVerifyCode = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [invalidCode, setInvalidCode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<IFormInput>({
    defaultValues: {
      pin: '',
      phone: localStorage.getItem("phone") || "", // Obtenemos el teléfono almacenado
    }, 
  });

  const pinValue = watch("pin");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    setInvalidCode(false);

    try {
      const response = await authService.verifyCode(data.phone, data.pin);

      if (response.status === 200) {
        const { token, shop } = response.data;

        // Guardamos los datos en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('shopId', shop.id);
        localStorage.setItem('own_delivery', shop.own_delivery || 'false');
        localStorage.setItem('val_own_delivery', shop.val_own_delivery || 'false');
        localStorage.setItem('val_min_bills', shop.val_min_bills || '0');
        localStorage.setItem('open', shop.open || 'false');
        localStorage.setItem('nameStore', shop.name);
        localStorage.setItem('avatarStore', shop.media.avatar?.path);

        navigate('/dashboard'); // Redirige a la página de pedidos
      } else {
        setMessage('Código inválido');
        setInvalidCode(true);
      }
    } catch (err) {
      setMessage('Ocurrió un error al validar el código');
      setInvalidCode(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const backLogin = () => {
    navigate("/login"); // Redirige al login
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
    pinValue,
  };
};
