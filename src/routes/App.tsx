import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import Home from '../home/home';
import Login from '../pages/login/login'; 
import NotFoundPage from '../pages/404/404-Pages';
import PrivateRoute from "./PrivateRoute"; // Rutas protegidas
import VerifyCodeComponent from '../components/login/verify-codeComponents'; // Importa tu componente de verificación de código
import  Dashboard from "../pages/dashboard/dashboard-page"
import Staff from "../pages/dashboard/Staff-pages"
import CategoryPage from '../pages/dashboard/category-page';
import SuppliersPage from '../pages/dashboard/suppliers-page';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Ruta principal a Home */}
      <Route path="/login" element={<Login />} /> {/* Ruta a Login */}
      <Route path="/verify-code" element={<VerifyCodeComponent />} /> {/* Ruta a la verificación del código */}
      <Route path="/404" element={<Navigate to="/" replace />} /> {/* Página de error y cuando intenten entrar un usuario a la ruta de 404 me redirija a Home */}
      <Route path="*" element={<NotFoundPage />} /> {/* Captura rutas no definidas, al identificar una ruta que no existe me muestre el error 404 */}

      <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} /> {/* Ruta del dashboard principal */}
      <Route path='/Staff' element={<PrivateRoute><Staff /></PrivateRoute>} /> {/* Ruta de los empleados */}
      <Route path='/category' element={<PrivateRoute><CategoryPage /></PrivateRoute>} /> {/* Ruta de las categorías */}
      <Route path='/suppliers' element={<PrivateRoute><SuppliersPage /></PrivateRoute>} />  {/* Ruta de los proveedores */}

    </Routes>
  );
};

export default App;
