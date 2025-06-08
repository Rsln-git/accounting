import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import AdministrServicesPage from "../pages/AdministrativeServicePage/AdministrativeServicePage";
import AdministrativeServiceCardPage from "../pages/AdministrativeServicePage/AdministrativeServiceCardP/AdministrativeServiceCardP";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" replace />;
}

function AppRouter() {
  return (
    <Routes>
      {/* Публічні маршрути */}
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/login" element={<LoginPage />} />

      {/* Приватні маршрути */}
      {/* <Route
        path="/"
        element={<PrivateRoute><HomePage /></PrivateRoute>}
      /> */}
        <Route
          path="/"
          element={<PrivateRoute><AdministrativeServiceCardPage /></PrivateRoute>}
        />
        <Route
        path="/administrative-services"
        element={<PrivateRoute><AdministrServicesPage /></PrivateRoute>}>

          <Route path="administrative-service-card" element={<AdministrativeServiceCardPage />} />
        
        </Route>

      {/* Фолбек */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRouter;
