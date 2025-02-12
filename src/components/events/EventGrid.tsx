import React from "react";
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
}

interface EventGridProps {
  events?: Event[];
  onRSVP?: (eventId: string) => void;
}

const EventGrid = ({
  events = [
    {
      id: "1",
      title: "Tech Conference 2024",
      date: "2024-05-20",
      time: "09:00",
      location: "Convention Center",
      attendees: 150,
      description:
        "Annual technology conference featuring industry leaders and innovative workshops.",
      category: "Technology",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    },
    {
      id: "2",
      title: "Startup Networking",
      date: "2024-05-25",
      time: "18:30",
      location: "Innovation Hub",
      attendees: 75,
      description:
        "Connect with fellow entrepreneurs and investors in a casual setting.",
      category: "Networking",
      imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
    },
    {
      id: "3",
      title: "Design Workshop",
      date: "2024-06-01",
      time: "14:00",
      location: "Creative Studio",
      attendees: 30,
      description:
        "Hands-on workshop exploring the latest trends in UI/UX design.",
      category: "Design",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    },
  ],
  onRSVP = (eventId: string) =>
    console.log(`RSVP clicked for event ${eventId}`),
}: EventGridProps) => {
  return (
    <div className="w-full h-[400px] bg-gray-50 p-6 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
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
            onRSVP={() => onRSVP(event.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default EventGrid;
