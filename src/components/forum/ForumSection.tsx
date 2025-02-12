import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Eye } from "lucide-react";

interface ForumThread {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  replies: number;
  views: number;
  likes: number;
  lastActivity: string;
}

interface ForumSectionProps {
  threads?: ForumThread[];
}

const ForumSection = ({
  threads = [
    {
      id: "1",
      title: "Getting Started with Community Events",
      author: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
      category: "General",
      replies: 23,
      views: 156,
      likes: 45,
      lastActivity: "2 hours ago",
    },
    {
      id: "2",
      title: "Best Practices for Event Planning",
      author: {
        name: "Mike Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      },
      category: "Tips",
      replies: 15,
      views: 89,
      likes: 32,
      lastActivity: "5 hours ago",
    },
    {
      id: "3",
      title: "Community Feedback Thread",
      author: {
        name: "Alex Turner",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      },
      category: "Feedback",
      replies: 45,
      views: 230,
      likes: 67,
      lastActivity: "1 day ago",
    },
  ],
}: ForumSectionProps) => {
  return (
    <Card className="w-full h-[300px] bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Forum Discussions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full">
          <div className="space-y-4">
            {threads.map((thread) => (
              <div
                key={thread.id}
                className="flex items-start space-x-4 p-4 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src={thread.author.avatar} />
                  <AvatarFallback>{thread.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{thread.title}</h3>
                    <Badge variant="secondary">{thread.category}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {thread.replies}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {thread.views}
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {thread.likes}
                    </div>
                    <span className="text-xs">{thread.lastActivity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ForumSection;
