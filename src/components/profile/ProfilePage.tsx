import React from "react";
import TopNavigation from "../layout/TopNavigation";
import Sidebar from "../layout/Sidebar";
import UserProfile from "./UserProfile";

interface ProfilePageProps {
  userRole?: "admin" | "regular";
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
}

const ProfilePage = ({
  userRole = "regular",
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  notificationCount = 3,
}: ProfilePageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation
        userRole={userRole}
        userName={userName}
        userAvatar={userAvatar}
        notificationCount={notificationCount}
      />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar isAdmin={userRole === "admin"} />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <UserProfile
            user={{
              name: userName,
              avatar: userAvatar,
              email: "john.doe@example.com",
              location: "San Francisco, CA",
              joinDate: "January 2024",
              bio: "Passionate about technology and community building. Always eager to learn and share knowledge with others.",
              role: userRole,
              interests: [
                "Technology",
                "Web Development",
                "UI/UX Design",
                "Community",
              ],
              stats: {
                eventsAttended: 12,
                eventsOrganized: 3,
                forumPosts: 25,
              },
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
