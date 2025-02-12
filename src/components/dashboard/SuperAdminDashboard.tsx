import React from "react";
import WelcomeSection from "./WelcomeSection";
import EventGrid from "../events/EventGrid";
import ForumSection from "../forum/ForumSection";
import ActivityFeed from "./ActivityFeed";
import DashboardLayout from "../layout/DashboardLayout";

const SuperAdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <WelcomeSection
          userName="Super Admin"
          isAdmin={true}
          upcomingEventsCount={10}
        />

        <div className="grid grid-cols-1 gap-6">
          <EventGrid />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ForumSection />
            <ActivityFeed />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
