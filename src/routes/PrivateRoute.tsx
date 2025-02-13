import { Navigate } from "react-router-dom";
import { authService } from "../Services/auth.service"; // Importamos el servicio de autenticación

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return authService.isLoggedIn() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
