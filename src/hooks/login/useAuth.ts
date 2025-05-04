
import { authService } from "../../Services/auth.service";

const useAuth = () => {
  const isLoggedIn = authService.isLoggedIn(); // Verifica si hay token
  return { isLoggedIn };
};

export default useAuth;
