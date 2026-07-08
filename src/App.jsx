import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import SelectionPage from "./pages/SelectionPage";

const ChecklistPage = lazy(() => import("./pages/ChecklistPage.jsx"));

function PageLoader() {
  return (
    <div className="page page--center">
      <div className="card card--narrow">
        <h1>Geräteaufnahme</h1>
        <p className="subtitle">Seite wird geladen …</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Geschützter Bereich */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<SelectionPage />} />
            <Route path="/checklist/:categoryId" element={<ChecklistPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
