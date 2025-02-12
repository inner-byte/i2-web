import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-blue-600">
              CS Community
            </a>
            <nav className="hidden md:flex ml-10 space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600">
                Features
              </a>
              <a href="#events" className="text-gray-600 hover:text-blue-600">
                Events
              </a>
              <a href="#members" className="text-gray-600 hover:text-blue-600">
                Members
              </a>
              <a href="#about" className="text-gray-600 hover:text-blue-600">
                About
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/signup")}>Join Now</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
