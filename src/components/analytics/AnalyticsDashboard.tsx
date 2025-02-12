import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MessageSquare, TrendingUp } from "lucide-react";

interface AnalyticsData {
  totalMembers: number;
  activeMembers: number;
  totalEvents: number;
  upcomingEvents: number;
  totalPosts: number;
  activePosts: number;
  memberGrowth: number;
  eventAttendance: number;
  forumEngagement: number;
}

const AnalyticsDashboard = () => {
  const [analytics] = React.useState<AnalyticsData>({
    totalMembers: 1250,
    activeMembers: 890,
    totalEvents: 45,
    upcomingEvents: 12,
    totalPosts: 320,
    activePosts: 180,
    memberGrowth: 15,
    eventAttendance: 85,
    forumEngagement: 65,
  });

  const stats = [
    {
      title: "Total Members",
      value: analytics.totalMembers,
      change: `+${analytics.memberGrowth}%`,
      trend: "up",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Active Events",
      value: analytics.upcomingEvents,
      total: analytics.totalEvents,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Forum Posts",
      value: analytics.activePosts,
      total: analytics.totalPosts,
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      title: "Engagement Rate",
      value: `${analytics.forumEngagement}%`,
      trend: "up",
      icon: <TrendingUp className="h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">Analytics Overview</h2>
        <p className="text-muted-foreground">
          Track community growth and engagement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.total && (
                <p className="text-xs text-muted-foreground">
                  out of {stat.total} total
                </p>
              )}
              {stat.change && (
                <Badge
                  variant={stat.trend === "up" ? "success" : "destructive"}
                  className="mt-1"
                >
                  {stat.change}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Member Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              [Member Activity Chart]
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              [Event Attendance Chart]
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
