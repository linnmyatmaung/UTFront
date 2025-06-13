import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { AuthCodePage } from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import {
  ProtectedAdminLayout,
  ProtectedCodeLayout,
} from "./layout/ProtectedLayout";
import { useEffect, useState, Suspense } from "react";
import Loader from "./common/Loader";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPage from "./pages/admin/AdminPage";
import StartNewAgenda from "./pages/admin/AdminAgenda";
import Agenda from "./pages/Agenda";
import AdminSelection from "./pages/admin/AdminSelection";
const App = () => {
  const { isCodeAuthenticated, isAdminAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Login Pages */}
        <Route
          path="/login/code"
          element={isCodeAuthenticated ? <Navigate to="/" /> : <AuthCodePage />}
        />
        <Route
          path="/login/admin"
          element={
            isAdminAuthenticated ? <Navigate to="/admin" /> : <AdminLogin />
          }
        />

        {/* Add all code protected routes here */}
        <Route element={<ProtectedCodeLayout />}>
          <Route path="/" element={<MainPage />} />
        </Route>

        {/* Admin routes with auth and sidebar layout */}
        <Route element={<ProtectedAdminLayout />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/agenda" element={<StartNewAgenda />} />
          <Route path="/admin/selection" element={<AdminSelection />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/agenda" element={<Agenda />} />
      </Routes>
    </Suspense>
  );
};

export default App;
