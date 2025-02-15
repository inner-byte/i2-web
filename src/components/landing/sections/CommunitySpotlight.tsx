import React from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CommunitySpotlight = () => {
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
            Community Spotlight
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
              className="bg-card p-6 rounded-xl border border-border hover:border-border/80 transition-all"
            >
              <div className="flex items-center mb-4">
                <img
                  src={project.avatar}
                  alt={project.author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-foreground font-semibold">{project.author}</h3>
                  <p className="text-muted-foreground text-sm">{project.role}</p>
                </div>
              </div>
              
              <h4 className="text-xl font-semibold text-foreground mb-2">
                {project.title}
              </h4>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-muted text-muted-foreground text-sm rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
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