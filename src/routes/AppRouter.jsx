import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/Login/LoginPage";

function PrivateRoute({ children }) {
  //   const { user } = useAuth();
  //   return user ? children : <Navigate to="/login" replace />;
}

function AppRouter() {
  return (
    <Routes>
      {/* Публічні маршрути */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Приватні маршрути */}
      <Route
        path="/dashboard"
        element={<PrivateRoute>{/* <DashboardPage /> */}</PrivateRoute>}
      />

      {/* Фолбек */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouter;
