import React from "react";
import { motion } from "framer-motion";

export const TechnologyStack = () => {
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
            Powered by Modern Tech Stack
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
              className="group flex flex-col items-center p-6 bg-card rounded-lg border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="h-12 w-12 object-contain mb-4 group-hover:scale-110 transition-transform"
              />
              <h3 className="text-lg font-semibold text-foreground mb-2">{tech.name}</h3>
              <p className="text-sm text-muted-foreground text-center mb-3">{tech.description}</p>
              <div className="text-xs text-primary font-semibold">{tech.stats}</div>
              <a
                href={tech.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
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