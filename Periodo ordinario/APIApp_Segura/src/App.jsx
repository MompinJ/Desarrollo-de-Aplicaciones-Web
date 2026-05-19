import { Routes, Route, Navigate } from "react-router-dom";
import SecureRoute from "./components/SecureRoute.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Detalles from "./pages/Detalles.jsx";
import Filtrar from "./pages/Filtrar.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <SecureRoute>
            <Home />
          </SecureRoute>
        }
      />
      <Route
        path="/detalles/:id"
        element={
          <SecureRoute>
            <Detalles />
          </SecureRoute>
        }
      />
      <Route
        path="/filtrar"
        element={
          <SecureRoute>
            <Filtrar />
          </SecureRoute>
        }
      />
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
