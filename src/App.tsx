import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import ProfilePage from "./components/profile/ProfilePage";
import LandingPage from "./components/landing/LandingPage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import SuperAdminDashboard from "./components/dashboard/SuperAdminDashboard";
import MemberDashboard from "./components/dashboard/MemberDashboard";
import { useAuth } from "./lib/auth";

function App() {
  const { user } = useAuth();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {user?.role === "super_admin" ? (
                <SuperAdminDashboard />
              ) : user?.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <MemberDashboard />
              )}
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Super Admin Routes */}
        <Route
          path="/super-admin/*"
          element={
            <ProtectedRoute requiredRole="super_admin">
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
