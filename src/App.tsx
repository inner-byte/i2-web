import { Suspense } from "react";
import { Routes, Route, Navigate, useRoutes } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import SuperAdminDashboard from "./components/dashboard/SuperAdminDashboard";
import MemberDashboard from "./components/dashboard/MemberDashboard";
import ProfilePage from "./components/profile/ProfilePage";
import { useAuth } from "./lib/auth";
import routes from "tempo-routes";
import { ThemeProvider } from "./lib/theme/theme-provider";

function App() {
  const { user } = useAuth();

  const getDashboardComponent = () => {
    switch (user?.role) {
      case "super_admin":
        return <SuperAdminDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <MemberDashboard />;
    }
  };

  return (
    <ThemeProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        }
      >
        {/* For the tempo routes */}
        {import.meta.env.VITE_TEMPO && useRoutes(routes)}

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute>{getDashboardComponent()}</ProtectedRoute>}
          />

          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Super admin routes */}
          <Route
            path="/super-admin/*"
            element={
              <ProtectedRoute requiredRole="super_admin">
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Profile route */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Add tempo routes before the catchall */}
          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
