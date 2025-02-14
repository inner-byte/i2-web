import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Cpu,
  Globe,
  Users,
  Zap,
  Server,
  Shield,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  ChevronUp,
} from "lucide-react";
import { GuidedTour, useTooltip } from "@/components/ui/guided-tour";
import Header from "./Header";
import Footer from "./Footer";

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

// Components
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
              Tech Community Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Unlock Your Potential in Tech
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Join a thriving community of tech enthusiasts. Connect with peers, learn from experts,
              and build amazing projects together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate("/signup")}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
            
            {/* Social Proof */}
            <div className="grid grid-cols-3 gap-8 mt-12">
              {[
                { number: "10K+", label: "Members" },
                { number: "500+", label: "Projects" },
                { number: "200+", label: "Events" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[400px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg overflow-hidden">
              <motion.div
                animate={{
                  background: [
                    "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)",
                    "radial-gradient(circle at 0% 100%, rgba(37, 99, 235, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)",
                    "radial-gradient(circle at 100% 0%, rgba(37, 99, 235, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute inset-0"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/hero-visual.svg"
                  alt="Platform visualization"
                  className="w-4/5 h-4/5 object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface FeatureShowcaseProps {
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

const FeatureShowcase = ({ onMouseEnter, onMouseLeave }: FeatureShowcaseProps) => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything You Need to Excel in Tech
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Access powerful tools and resources designed for modern tech
            professionals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Code2 className="h-8 w-8 text-blue-400" />,
              title: "Collaborative Coding",
              description:
                "Join forces with fellow developers on exciting projects. Share code, get instant feedback, and build your portfolio together.",
              metric: "1000+ Active Projects",
            },
            {
              icon: <Globe className="h-8 w-8 text-purple-400" />,
              title: "Global Network",
              description:
                "Expand your reach and connect with tech professionals worldwide. Find mentors, collaborators, and career opportunities.",
              metric: "50+ Countries",
            },
            {
              icon: <Cpu className="h-8 w-8 text-green-400" />,
              title: "Latest Tech Stack",
              description:
                "Stay ahead of the curve with access to the latest technologies, tutorials, and industry best practices.",
              metric: "20+ Tech Tracks",
            },
            {
              icon: <Users className="h-8 w-8 text-yellow-400" />,
              title: "Mentorship Program",
              description:
                "Learn from experienced professionals through our structured mentorship program. Get guidance, feedback, and career advice.",
              metric: "200+ Mentors",
            },
            {
              icon: <Server className="h-8 w-8 text-red-400" />,
              title: "Resource Library",
              description:
                "Access a vast library of tutorials, articles, videos, and code snippets. Everything you need to level up your skills.",
              metric: "5000+ Resources",
            },
            {
              icon: <Shield className="h-8 w-8 text-indigo-400" />,
              title: "Career Growth",
              description:
                "Access job opportunities, resume reviews, mock interviews, and career guidance from industry experts.",
              metric: "500+ Success Stories",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-all cursor-pointer group"
            >
              <div className="p-3 bg-gray-900 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <div className="text-sm font-semibold text-blue-400">
                {feature.metric}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TechnologyStack = () => {
  const technologies = [
    {
      name: "React",
      icon: "/react.svg",
      description: "Frontend development",
      docs: "https://react.dev",
      stats: "45% faster rendering"
    },
    {
      name: "TypeScript",
      icon: "/typescript.svg",
      description: "Type-safe development",
      docs: "https://www.typescriptlang.org",
      stats: "50% fewer bugs"
    },
    {
      name: "Node.js",
      icon: "/nodejs.svg",
      description: "Backend runtime",
      docs: "https://nodejs.org",
      stats: "High performance"
    },
    {
      name: "Tailwind",
      icon: "/tailwind.svg",
      description: "Utility-first CSS",
      docs: "https://tailwindcss.com",
      stats: "Rapid development"
    },
    {
      name: "MongoDB",
      icon: "/mongodb.svg",
      description: "NoSQL Database",
      docs: "https://www.mongodb.com",
      stats: "Scalable storage"
    },
    {
      name: "Docker",
      icon: "/docker.svg",
      description: "Containerization",
      docs: "https://www.docker.com",
      stats: "Easy deployment"
    },
    {
      name: "AWS",
      icon: "/aws.svg",
      description: "Cloud infrastructure",
      docs: "https://aws.amazon.com",
      stats: "99.99% uptime"
    },
    {
      name: "Redis",
      icon: "/redis.svg",
      description: "Caching layer",
      docs: "https://redis.io",
      stats: "Sub-ms latency"
    }
  ];

  return (
    <section className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powered by Modern Tech Stack
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built with the latest technologies for optimal performance and scalability
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group flex flex-col items-center p-6 bg-gray-900 rounded-lg border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="h-12 w-12 object-contain mb-4 group-hover:scale-110 transition-transform"
              />
              <h3 className="text-lg font-semibold text-white mb-2">{tech.name}</h3>
              <p className="text-sm text-gray-400 text-center mb-3">{tech.description}</p>
              <div className="text-xs text-blue-400 font-semibold">{tech.stats}</div>
              <a
                href={tech.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm text-gray-400 hover:text-white transition-colors"
              >
                View Docs →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CommunitySpotlight = () => {
  const spotlightProjects = [
    {
      title: "AI Code Assistant",
      description: "An intelligent coding assistant that helps developers write better code faster.",
      author: "Sarah Chen",
      role: "AI Engineer",
      avatar: "/avatars/sarah.jpg",
      tags: ["AI/ML", "Python", "React"],
      stats: {
        stars: "2.5k",
        forks: "450",
      },
    },
    {
      title: "DevConnect",
      description: "A platform that connects developers with mentors and job opportunities.",
      author: "Marcus Johnson",
      role: "Full Stack Developer",
      avatar: "/avatars/marcus.jpg",
      tags: ["TypeScript", "Node.js", "MongoDB"],
      stats: {
        stars: "1.8k",
        forks: "320",
      },
    },
    {
      title: "CloudScale",
      description: "Automated cloud infrastructure scaling and optimization tool.",
      author: "Priya Patel",
      role: "Cloud Architect",
      avatar: "/avatars/priya.jpg",
      tags: ["AWS", "Terraform", "Go"],
      stats: {
        stars: "3.2k",
        forks: "580",
      },
    },
  ];

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Community Spotlight
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Highlighting our amazing community members and their projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spotlightProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all"
            >
              <div className="flex items-center mb-4">
                <img
                  src={project.avatar}
                  alt={project.author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-white font-semibold">{project.author}</h3>
                  <p className="text-gray-400 text-sm">{project.role}</p>
                </div>
              </div>
              
              <h4 className="text-xl font-semibold text-white mb-2">
                {project.title}
              </h4>
              <p className="text-gray-400 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-gray-900 text-gray-300 text-sm rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center">
                  <Github className="h-4 w-4 mr-1" />
                  <span>{project.stats.stars} stars</span>
                </div>
                <div className="flex items-center">
                  <Github className="h-4 w-4 mr-1" />
                  <span>{project.stats.forks} forks</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="text-gray-300 border-gray-700">
            View More Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

interface CallToActionProps {
  cta: {
    title: string;
    description: string;
  };
}

const CallToAction = ({ cta }: CallToActionProps) => {
  const navigate = useNavigate();

  return (
    <motion.section
      className="py-24 bg-gradient-to-b from-gray-800 to-gray-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {cta.title}
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            {cta.description}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate("/signup")}
            >
              Join the Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
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
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                onClick={() => navigate("/signup")}
              >
                Start Building
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="bg-gray-800/90 hover:bg-gray-800 text-white rounded-full shadow-lg"
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
