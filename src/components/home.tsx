import React from "react";
import TopNavigation from "./layout/TopNavigation";
import Sidebar from "./layout/Sidebar";
import WelcomeSection from "./dashboard/WelcomeSection";
import EventGrid from "./events/EventGrid";
import ForumSection from "./forum/ForumSection";
import ActivityFeed from "./dashboard/ActivityFeed";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
          user.role === "super_admin"
            ? "admin"
            : user.role === "admin"
              ? "admin"
              : "regular"
        }
        userName={user.name}
        userAvatar={user.avatar}
        notificationCount={3}
        onLogout={handleLogout}
      />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar
          isAdmin={user.role === "admin" || user.role === "super_admin"}
        />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <WelcomeSection
              userName={user.name}
              isAdmin={user.role === "admin" || user.role === "super_admin"}
              upcomingEventsCount={3}
            />

            <div className="grid grid-cols-1 gap-6">
              <EventGrid />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ForumSection />
                <ActivityFeed />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
