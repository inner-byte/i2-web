import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
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
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Tech Community Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Unlock Your Potential in Tech
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join a thriving community of tech enthusiasts. Connect with peers, learn from experts,
              and build amazing projects together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="default"
                onClick={() => navigate("/signup")}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
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
                  <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
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