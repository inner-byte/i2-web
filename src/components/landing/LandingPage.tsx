import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GuidedTour, useTooltip } from "@/components/ui/guided-tour";
import Header from "./Header";
import Footer from "./Footer";
import { HeroSection } from "./sections/HeroSection";
import { FeatureShowcase } from "./sections/FeatureShowcase";
import { TechnologyStack } from "./sections/TechnologyStack";
import { CommunitySpotlight } from "./sections/CommunitySpotlight";
import { CallToAction } from "./sections/CallToAction";

// Tour steps configuration
const tourSteps = [
  {
    target: '[data-tour="search"]',
    title: "Smart Search",
    content: "Use our intelligent search to find projects, members, and resources.",
    position: "bottom" as const,
  },
  {
    target: '[data-tour="features"]',
    title: "Platform Features",
    content: "Explore our key features designed to help you grow and learn.",
    position: "top" as const,
  },
  {
    target: '[data-tour="community"]',
    title: "Community Projects",
    content: "Discover amazing projects built by our community members.",
    position: "left" as const,
  },
];

// Smart CTA content based on scroll position
const ctaVariants = {
  top: {
    title: "Join Our Tech Community",
    description: "Connect with developers, build projects, and grow your skills.",
  },
  middle: {
    title: "Ready to Start Building?",
    description: "Get access to resources, mentorship, and collaboration opportunities.",
  },
  bottom: {
    title: "Don't Miss Out!",
    description: "Join thousands of developers already building the future.",
  },
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [showTour, setShowTour] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  
  // Tooltip example for feature cards
  const { tooltipProps, Tooltip } = useTooltip("Click to learn more about this feature");

  useEffect(() => {
    // Show tour after a short delay for new visitors
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      const timer = setTimeout(() => setShowTour(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      setShowFloatingCTA(position > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTourComplete = () => {
    setShowTour(false);
    localStorage.setItem('hasSeenTour', 'true');
  };

  const getCurrentCTA = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollPosition < totalHeight * 0.3) return ctaVariants.top;
    if (scrollPosition < totalHeight * 0.7) return ctaVariants.middle;
    return ctaVariants.bottom;
  };

  const currentCTA = getCurrentCTA();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <Header />
      <HeroSection />
      <div data-tour="features">
        <FeatureShowcase {...tooltipProps} />
      </div>
      <TechnologyStack />
      <div data-tour="community">
        <CommunitySpotlight />
      </div>
      <CallToAction cta={currentCTA} />
      <Footer />

      {/* Guided Tour */}
      <GuidedTour
        steps={tourSteps}
        isOpen={showTour}
        onClose={handleTourComplete}
      />

      {/* Floating CTA */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <div className="flex flex-col items-end space-y-4">
              <Button
                size="lg"
                variant="default"
                className="shadow-lg"
                onClick={() => navigate("/signup")}
              >
                Start Building
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="bg-muted/90 hover:bg-muted text-foreground rounded-full shadow-lg"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <ChevronUp className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature Tooltips */}
      <Tooltip />
    </div>
  );
};

export default LandingPage;
