import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageSquare, ThumbsUp, UserPlus } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "event" | "forum" | "like" | "follow";
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities?: ActivityItem[];
}

const ActivityFeed = ({
  activities = [
    {
      id: "1",
      type: "event",
      user: {
        name: "Sarah Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      content: 'created a new event: "Tech Meetup 2024"',
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "forum",
      user: {
        name: "Mike Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      },
      content: 'replied to "Best practices for React development"',
      timestamp: "3 hours ago",
    },
    {
      id: "3",
      type: "like",
      user: {
        name: "Emily Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      },
      content: 'liked your comment in "Community Guidelines"',
      timestamp: "5 hours ago",
    },
    {
      id: "4",
      type: "follow",
      user: {
        name: "David Kim",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      },
      content: "started following you",
      timestamp: "1 day ago",
    },
  ],
}: ActivityFeedProps) => {
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "event":
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case "forum":
        return <MessageSquare className="w-4 h-4 text-green-500" />;
      case "like":
        return <ThumbsUp className="w-4 h-4 text-red-500" />;
      case "follow":
        return <UserPlus className="w-4 h-4 text-purple-500" />;
      default:
        return null;
    }
  };

  const getActivityColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "event":
        return "bg-blue-100 text-blue-800";
      case "forum":
        return "bg-green-100 text-green-800";
      case "like":
        return "bg-red-100 text-red-800";
      case "follow":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full h-[300px] bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={activity.user.avatar}
                    alt={activity.user.name}
                  />
                  <AvatarFallback>
                    {activity.user.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{activity.user.name}</span>
                    <Badge
                      variant="secondary"
                      className={getActivityColor(activity.type)}
                    >
                      {getActivityIcon(activity.type)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.content}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
