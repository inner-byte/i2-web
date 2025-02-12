import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar,
  Users,
  MessageSquare,
  Settings,
  Home,
  PlusCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  className?: string;
  isAdmin?: boolean;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  adminOnly?: boolean;
}

const Sidebar = ({ className = "", isAdmin = false }: SidebarProps) => {
  const navItems: NavItem[] = [
    { label: "Home", icon: <Home className="w-5 h-5" />, href: "/" },
    {
      label: "Events",
      icon: <Calendar className="w-5 h-5" />,
      href: "/events",
    },
    {
      label: "Forums",
      icon: <MessageSquare className="w-5 h-5" />,
      href: "/forums",
    },
    { label: "Members", icon: <Users className="w-5 h-5" />, href: "/members" },
    {
      label: "Admin",
      icon: <Settings className="w-5 h-5" />,
      href: "/admin",
      adminOnly: true,
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col w-[280px] h-full bg-background border-r px-4 py-6",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-2xl font-bold">Platform</h2>
        {isAdmin && (
          <Button variant="ghost" size="icon">
            <PlusCircle className="w-5 h-5" />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 -mx-4">
        <div className="px-4 space-y-2">
          <TooltipProvider>
            {navItems.map((item) => {
              if (item.adminOnly && !isAdmin) return null;

              return (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 px-3",
                        "hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Go to {item.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>
      </ScrollArea>

      <div className="mt-auto px-2">
        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full justify-start gap-3">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
