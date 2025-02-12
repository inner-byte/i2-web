import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MoreVertical } from "lucide-react";
import CreateEventDialog from "./CreateEventDialog";
import EventCard from "./EventCard";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  description: string;
  category: string;
  imageUrl: string;
  status: "upcoming" | "ongoing" | "past";
}

const EventManagement = () => {
  const [events, setEvents] = React.useState<Event[]>([
    {
      id: "1",
      title: "Tech Workshop 2024",
      date: "2024-05-20",
      time: "09:00",
      location: "Innovation Hub",
      attendees: 42,
      description: "Join us for an exciting workshop on emerging technologies.",
      category: "Workshop",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      status: "upcoming",
    },
    // Add more events as needed
  ]);

  const handleCreateEvent = (eventData: any) => {
    const newEvent: Event = {
      id: String(events.length + 1),
      ...eventData,
      attendees: 0,
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      status: "upcoming",
    };
    setEvents([...events, newEvent]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Event Management</h2>
          <p className="text-muted-foreground">
            Create and manage community events
          </p>
        </div>
        <CreateEventDialog onSubmit={handleCreateEvent} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search events..." className="pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                attendees={event.attendees}
                description={event.description}
                category={event.category}
                imageUrl={event.imageUrl}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventManagement;
