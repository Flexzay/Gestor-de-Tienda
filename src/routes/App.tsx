import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../home/home";
import Login from "../pages/login/login";
import NotFoundPage from "../pages/404/404-Pages";
import PrivateRoute from "./PrivateRoute";
import VerifyCode from "../pages/login/verify-code";
import SelectStorePage from "../pages/login/select-store";
import Dashboard from "../pages/dashboard/dashboard-page";
import Staff from "../pages/dashboard/Staff-pages";
import CategoryPage from "../pages/dashboard/category-page";
import SuppliersPage from "../pages/dashboard/Providers";
import PaymentMethodPage from "../pages/dashboard/paymentMetthod-page";
import ExpensesIncomePage from "../pages/dashboard/receipts-page";
import ProductDetail from "../components/dashboard/Product/ProductDatail"; 
import MenbershipCreditos from "../components/dashboard/membership/membershiComponents"; 
import ProfilePage from "../pages/dashboard/Profile-page";
import OrdersPage from "../pages/dashboard/orders-page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-code" element={<VerifyCode />} />

      <Route path="/select-store" element={<PrivateRoute><SelectStorePage /></PrivateRoute>} />

      <Route path="/404" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* Rutas protegidas del Dashboard */}
      <Route path="/Dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/Staff" element={<PrivateRoute><Staff /></PrivateRoute>} />
      <Route path="/Category" element={<PrivateRoute><CategoryPage /></PrivateRoute>} />
      <Route path="/Suppliers" element={<PrivateRoute><SuppliersPage /></PrivateRoute>} />
      <Route path="/Payment-methods" element={<PrivateRoute><PaymentMethodPage /></PrivateRoute>} />
      <Route path="/Income" element={<PrivateRoute><ExpensesIncomePage /></PrivateRoute>} />
      <Route path="/Membership" element={<PrivateRoute>< MenbershipCreditos/></PrivateRoute>} />
      <Route path="store-profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />

      {/* 🆕 Ruta protegida para ver detalles de productos */}
      <Route path="/product/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
    </Routes>
  );
};

export default App;
