import React from "react";
import Header from "../landing/Header";
import Sidebar from "../layout/Sidebar";
import UserProfile from "./UserProfile";

interface ProfilePageProps {
  userRole?: "admin" | "regular";
  userName?: string;
  userAvatar?: string;
}

const ProfilePage = ({
  userRole = "regular",
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
}: ProfilePageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-64px)] pt-16">
        <Sidebar isAdmin={userRole === "admin"} />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <UserProfile
            user={{
              id: "user-1",
              status: "active",
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
              socialLinks: {
                github: "https://github.com/johndoe",
                linkedin: "https://linkedin.com/in/johndoe",
                twitter: "https://twitter.com/johndoe"
              },
              skills: ["React", "TypeScript", "Node.js", "UI/UX Design"],
              education: [
                {
                  school: "University of Technology",
                  degree: "BS Computer Science",
                  year: "2022"
                }
              ],
              experience: [
                {
                  company: "Tech Corp",
                  position: "Software Engineer",
                  duration: "2022-Present"
                }
              ]
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
