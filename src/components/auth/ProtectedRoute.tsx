import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, type UserRole, checkAccess } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

const ProtectedRoute = ({
  children,
  requiredRole = "member",
}: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && !checkAccess(user.role, requiredRole)) {
    // Redirect to appropriate dashboard if user doesn't have required role
    const redirectPath =
      user.role === "super_admin"
        ? "/super-admin"
        : user.role === "admin"
          ? "/admin"
          : "/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
