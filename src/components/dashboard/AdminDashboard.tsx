import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WelcomeSection from "./WelcomeSection";
import EventGrid from "../events/EventGrid";
import ForumSection from "../forum/ForumSection";
import ActivityFeed from "./ActivityFeed";
import DashboardLayout from "../layout/DashboardLayout";
import EventManagement from "../events/EventManagement";
import MemberManagement from "../members/MemberManagement";
import AnalyticsDashboard from "../analytics/AnalyticsDashboard";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <WelcomeSection
          userName="Admin"
          isAdmin={true}
          upcomingEventsCount={5}
        />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="forums">Forums</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <EventGrid />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ForumSection />
              <ActivityFeed />
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="events">
            <EventManagement />
          </TabsContent>

          <TabsContent value="members">
            <MemberManagement />
          </TabsContent>

          <TabsContent value="forums">
            {/* Forum management will be added here */}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
