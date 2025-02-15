import React from "react";
import { motion } from "framer-motion";
import { Code2, Cpu, Globe, Users, Server, Shield } from "lucide-react";

interface FeatureShowcaseProps {
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

export const FeatureShowcase = ({ onMouseEnter, onMouseLeave }: FeatureShowcaseProps) => {
  const features = [
    {
      icon: <Code2 className="h-8 w-8 text-primary" />,
      title: "Collaborative Coding",
      description:
        "Join forces with fellow developers on exciting projects. Share code, get instant feedback, and build your portfolio together.",
      metric: "1000+ Active Projects",
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Network",
      description:
        "Expand your reach and connect with tech professionals worldwide. Find mentors, collaborators, and career opportunities.",
      metric: "50+ Countries",
    },
    {
      icon: <Cpu className="h-8 w-8 text-primary" />,
      title: "Latest Tech Stack",
      description:
        "Stay ahead of the curve with access to the latest technologies, tutorials, and industry best practices.",
      metric: "20+ Tech Tracks",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Mentorship Program",
      description:
        "Learn from experienced professionals through our structured mentorship program. Get guidance, feedback, and career advice.",
      metric: "200+ Mentors",
    },
    {
      icon: <Server className="h-8 w-8 text-primary" />,
      title: "Resource Library",
      description:
        "Access a vast library of tutorials, articles, videos, and code snippets. Everything you need to level up your skills.",
      metric: "5000+ Resources",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Career Growth",
      description:
        "Access job opportunities, resume reviews, mock interviews, and career guidance from industry experts.",
      metric: "500+ Success Stories",
    },
  ];

  return (
    <section className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Excel in Tech
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access powerful tools and resources designed for modern tech
            professionals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-card p-8 rounded-xl border border-border hover:border-border/80 transition-all cursor-pointer group"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <div className="p-3 bg-muted rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <div className="text-sm font-semibold text-primary">
                {feature.metric}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};