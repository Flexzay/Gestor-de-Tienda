
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useBlockBack = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Evita retroceder después de ingresar
    window.history.pushState(null, '', window.location.pathname);
    const handleBack = () => {
      navigate('/dashboard', { replace: true });
    };

    window.addEventListener('popstate', handleBack);

    return () => {
      window.removeEventListener('popstate', handleBack);
    };
  }, [navigate]);
};

export default useBlockBack;
