import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { Command } from "cmdk";
import {
  Search,
  Menu,
  X,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
  Bell,
  Book,
  Calendar,
  MessageSquare,
  Code2,
  HelpCircle,
  Laptop,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { useTheme, useThemeValue } from "@/lib/theme/theme-provider";

// Mock data
const mockSearchSuggestions = [
  { type: 'project', title: 'AI Code Assistant', description: 'Popular project in AI category' },
  { type: 'member', title: 'Sarah Chen', description: 'AI Engineer' },
  { type: 'event', title: 'Hackathon 2025', description: 'Upcoming event' },
  { type: 'resource', title: 'Machine Learning Guide', description: 'Popular resource' },
];

const mockNotifications = [
  { id: 1, type: 'mention', text: 'Sarah mentioned you in AI project', time: '5m ago' },
  { id: 2, type: 'event', text: 'Hackathon starting in 2 days', time: '1h ago' },
  { id: 3, type: 'message', text: 'New message from John Doe', time: '2h ago' },
];

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/avatars/john.jpg',
  role: 'Full Stack Developer',
};

// Theme toggle component
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}>
          <DropdownMenuRadioItem value="light">
            <Sun className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <Laptop className="mr-2 h-4 w-4" />
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(mockSearchSuggestions);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock logged-in state
  
  const { theme } = useTheme();
  
  // Get theme values for dynamic styling
  const headerBg = useThemeValue('colors.background');
  const borderColor = useThemeValue('colors.border');
  const textColor = useThemeValue('colors.text');
  const mutedTextColor = useThemeValue('colors.muted');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search",
      description: `Searching for: ${searchQuery}`,
    });
  };

  // Update search suggestions
  useEffect(() => {
    if (searchQuery) {
      setFilteredSuggestions(
        mockSearchSuggestions.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  // Mock notification click handler
  const handleNotificationClick = (notification: typeof mockNotifications[0]) => {
    toast({
      title: "Notification",
      description: notification.text,
    });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
      style={{
        backgroundColor: `rgba(${headerBg}/0.8)`,
        borderColor: borderColor as string,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <motion.a
              href="/"
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">T</span>
              </div>
              <span className="text-xl font-bold text-foreground">TechHub</span>
            </motion.a>

            <nav className="hidden md:flex ml-10 space-x-8">
              {[
                { href: "/events", label: "Events", icon: <Calendar className="h-4 w-4" /> },
                { href: "/forums", label: "Forums", icon: <MessageSquare className="h-4 w-4" /> },
                { href: "/members", label: "Members", icon: <User className="h-4 w-4" /> },
                { href: "/resources", label: "Resources", icon: <Book className="h-4 w-4" /> },
                { href: "/mentorship", label: "Mentorship", icon: <Code2 className="h-4 w-4" /> },
                { href: "/about", label: "About Us", icon: <HelpCircle className="h-4 w-4" /> },
              ].map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.a>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search with Type-ahead */}
            <div className="relative hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                  onFocus={() => setShowSearchResults(true)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
              </form>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showSearchResults && searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-full bg-popover rounded-md shadow-lg border border-border overflow-hidden"
                  >
                    {filteredSuggestions.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-accent cursor-pointer"
                        onClick={() => {
                          setSearchQuery(item.title);
                          setShowSearchResults(false);
                        }}
                      >
                        <div className="flex items-center">
                          <Badge variant="secondary" className="mr-2">
                            {item.type}
                          </Badge>
                          <span className="text-foreground">{item.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
                        {mockNotifications.length}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {mockNotifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className="p-3 cursor-pointer"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div>
                          <p className="text-sm">{notification.text}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar>
                        <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{mockUser.name}</p>
                        <p className="text-xs text-muted-foreground">{mockUser.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => setIsLoggedIn(true)}
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-6">
                  <form onSubmit={handleSearch} className="relative mb-4">
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </form>
                  {[
                    { href: "/events", label: "Events", icon: <Calendar className="h-4 w-4" /> },
                    { href: "/forums", label: "Forums", icon: <MessageSquare className="h-4 w-4" /> },
                    { href: "/members", label: "Members", icon: <User className="h-4 w-4" /> },
                    { href: "/resources", label: "Resources", icon: <Book className="h-4 w-4" /> },
                    { href: "/mentorship", label: "Mentorship", icon: <Code2 className="h-4 w-4" /> },
                    { href: "/about", label: "About Us", icon: <HelpCircle className="h-4 w-4" /> },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-accent flex items-center space-x-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  ))}
                  <div className="pt-4 mt-4 border-t border-border">
                    {isLoggedIn ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 px-4">
                          <Avatar>
                            <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{mockUser.name}</p>
                            <p className="text-xs text-muted-foreground">{mockUser.role}</p>
                          </div>
                        </div>
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => {
                            setIsLoggedIn(false);
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" /> Sign Out
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button
                          className="w-full mb-3"
                          variant="outline"
                          onClick={() => {
                            setIsLoggedIn(true);
                            setIsOpen(false);
                          }}
                        >
                          Sign In
                        </Button>
                        <Button
                          className="w-full"
                          onClick={() => {
                            navigate("/signup");
                            setIsOpen(false);
                          }}
                        >
                          Get Started
                        </Button>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
