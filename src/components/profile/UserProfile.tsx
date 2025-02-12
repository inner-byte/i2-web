import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Mail, MapPin, User } from "lucide-react";
import EditProfileDialog from "./EditProfileDialog";

interface UserProfileProps {
  user?: {
    id: string;
    status: "active" | "inactive";
    socialLinks?: {
      github?: string;
      linkedin?: string;
      twitter?: string;
    };
    skills?: string[];
    education?: Array<{
      school: string;
      degree: string;
      year: string;
    }>;
    experience?: Array<{
      company: string;
      position: string;
      duration: string;
    }>;
    name: string;
    avatar: string;
    email: string;
    location: string;
    joinDate: string;
    bio: string;
    role: "admin" | "regular";
    interests: string[];
    stats: {
      eventsAttended: number;
      eventsOrganized: number;
      forumPosts: number;
    };
  };
}

const UserProfile = ({
  user = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    bio: "Passionate about technology and community building. Always eager to learn and share knowledge with others.",
    role: "regular" as const,
    interests: ["Technology", "Web Development", "UI/UX Design", "Community"],
    stats: {
      eventsAttended: 12,
      eventsOrganized: 3,
      forumPosts: 25,
    },
  },
}: UserProfileProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <Badge variant="secondary">{user.role}</Badge>
                </div>
                <div className="mt-2 space-y-2 text-muted-foreground">
                  <p className="flex items-center justify-center md:justify-start gap-2">
                    <Mail className="w-4 h-4" /> {user.email}
                  </p>
                  <p className="flex items-center justify-center md:justify-start gap-2">
                    <MapPin className="w-4 h-4" /> {user.location}
                  </p>
                  <p className="flex items-center justify-center md:justify-start gap-2">
                    <Calendar className="w-4 h-4" /> Joined {user.joinDate}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {user.interests.map((interest) => (
                  <Badge key={interest} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-center md:justify-start gap-4">
                <EditProfileDialog
                  user={{
                    name: user.name,
                    email: user.email,
                    location: user.location,
                    bio: user.bio,
                    interests: user.interests,
                  }}
                  onSave={(data) => {
                    console.log("Profile updated:", data);
                    // Here you would typically update the user data
                  }}
                />
                <Button variant="outline">Share Profile</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold">
                {user.stats.eventsAttended}
              </h3>
              <p className="text-muted-foreground">Events Attended</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold">
                {user.stats.eventsOrganized}
              </h3>
              <p className="text-muted-foreground">Events Organized</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold">{user.stats.forumPosts}</h3>
              <p className="text-muted-foreground">Forum Posts</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{user.bio}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity">{/* Activity content */}</TabsContent>
        <TabsContent value="events">{/* Events content */}</TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
