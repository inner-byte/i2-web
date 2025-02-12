import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Calendar } from "lucide-react";

interface WelcomeSectionProps {
  userName?: string;
  isAdmin?: boolean;
  upcomingEventsCount?: number;
  onCreateEvent?: () => void;
  onViewEvents?: () => void;
}

const WelcomeSection = ({
  userName = "User",
  isAdmin = false,
  upcomingEventsCount = 3,
  onCreateEvent = () => console.log("Create event clicked"),
  onViewEvents = () => console.log("View events clicked"),
}: WelcomeSectionProps) => {
  return (
    <Card className="w-full h-[120px] bg-white">
      <CardContent className="h-full flex items-center justify-between p-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Welcome back, {userName}!</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            You have {upcomingEventsCount} upcoming events
          </p>
        </div>

        <div className="flex gap-4">
          {isAdmin ? (
            <Button onClick={onCreateEvent} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Event
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={onViewEvents}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              View Events
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
