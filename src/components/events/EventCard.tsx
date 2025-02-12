import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

interface EventCardProps {
  title?: string;
  date?: string;
  time?: string;
  location?: string;
  attendees?: number;
  description?: string;
  category?: string;
  imageUrl?: string;
  onRSVP?: () => void;
}

const EventCard = ({
  title = "Community Meetup",
  date = "2024-04-15",
  time = "18:00",
  location = "Downtown Conference Center",
  attendees = 42,
  description = "Join us for an evening of networking and knowledge sharing with fellow community members.",
  category = "Networking",
  imageUrl = "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
  onRSVP = () => console.log("RSVP clicked"),
}: EventCardProps) => {
  return (
    <Card className="w-[384px] h-[280px] bg-white overflow-hidden flex flex-col">
      <div className="relative h-32">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-primary">{category}</Badge>
      </div>

      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-semibold truncate">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground flex items-center gap-1">
          <Calendar className="w-4 h-4" /> {date}
          <Clock className="w-4 h-4 ml-2" /> {time}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{attendees} attending</span>
        </div>
        <p className="text-sm mt-2 line-clamp-2">{description}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={onRSVP} className="w-full">
          RSVP Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
