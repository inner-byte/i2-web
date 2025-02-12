import React from "react";
import TopNavigation from "./TopNavigation";
import Sidebar from "./Sidebar";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation
        userRole={
          user.role === "super_admin" || user.role === "admin"
            ? "admin"
            : "regular"
        }
        userName={user.name}
        userAvatar={user.avatar}
        notificationCount={3}
        onLogout={handleLogout}
      />

      <div className="flex h-[calc(100vh-64px)] pt-16">
        <Sidebar
          isAdmin={user.role === "admin" || user.role === "super_admin"}
        />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
