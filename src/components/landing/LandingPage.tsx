import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Calendar,
  Users,
  MessageSquare,
  Sparkles,
  GraduationCap,
  Code,
  Globe,
  CheckCircle2,
  Laptop,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to CS Student Community
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Connect, learn, and grow with fellow computer science students,
              faculty, and alumni.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-white/90"
                onClick={() => navigate("/signup")}
              >
                Join the Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools and resources for your
              academic journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="h-8 w-8 text-blue-600" />,
                title: "Events & Workshops",
                description:
                  "Access exclusive tech events, workshops, and networking opportunities.",
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
                title: "Discussion Forums",
                description:
                  "Engage in meaningful discussions with peers and industry experts.",
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Community Network",
                description:
                  "Connect with alumni, faculty, and fellow students in your field.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-50 rounded-lg mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div id="events" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Events</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our exciting events and expand your knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Tech Workshop 2024",
                date: "March 15, 2024",
                category: "Workshop",
                image:
                  "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
              },
              {
                title: "Coding Bootcamp",
                date: "March 20, 2024",
                category: "Training",
                image:
                  "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
              },
              {
                title: "AI Conference",
                date: "April 1, 2024",
                category: "Conference",
                image:
                  "https://images.unsplash.com/photo-1552664730-d307ca884978",
              },
            ].map((event, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <Badge className="mb-2">{event.category}</Badge>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Members Section */}
      <div id="members" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Community</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Community
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our diverse community of tech enthusiasts
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Wilson",
                role: "Student Lead",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
              },
              {
                name: "John Chen",
                role: "Faculty Advisor",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
              },
              {
                name: "Emily Brown",
                role: "Event Coordinator",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
              },
              {
                name: "Michael Kim",
                role: "Tech Lead",
                avatar:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
              },
            ].map((member, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-offset-2 ring-transparent group-hover:ring-blue-500 transition-all">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            {[
              {
                icon: <Users className="h-8 w-8" />,
                stat: "1,000+",
                label: "Members",
              },
              {
                icon: <Calendar className="h-8 w-8" />,
                stat: "50+",
                label: "Events",
              },
              {
                icon: <MessageSquare className="h-8 w-8" />,
                stat: "100+",
                label: "Discussions",
              },
              {
                icon: <GraduationCap className="h-8 w-8" />,
                stat: "20+",
                label: "Universities",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="transform hover:scale-105 transition-transform"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <div className="text-3xl font-bold mb-2">{item.stat}</div>
                <div className="text-white/80">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Benefits</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Join Our Community?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the advantages of being part of our growing network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Laptop className="h-6 w-6 text-blue-600" />,
                title: "Hands-on Learning",
                description: "Access practical workshops and coding sessions",
              },
              {
                icon: <Users className="h-6 w-6 text-blue-600" />,
                title: "Networking",
                description: "Connect with industry professionals and peers",
              },
              {
                icon: <BookOpen className="h-6 w-6 text-blue-600" />,
                title: "Resources",
                description: "Get access to exclusive learning materials",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-3 bg-blue-50 rounded-lg">{benefit.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
