import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  ReceiptText,
  UserCircle,
  TrendingUp,
  CreditCard,
  Banknote,
  Wrench,
  Star,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AdvisoryComponent from "@/feature/homepage/Advisory";
import CreditScore from "@/feature/homepage/CreditScore";
import Reporting from "@/feature/homepage/Reporting";
import Profile from "@/feature/homepage/Profile";
import Intro from "@/feature/homepage/Dashboard";
import Header from "./Header";
import { Footer } from "./Footer";

// Define placeholder components for each menu item
const Dashboard = () => <Dashboard />;
const Reports = () => <Reporting />;
const Advisory = () => <AdvisoryComponent />;
const CreditCards = () => <CreditScore />;
const Accounts = () => <Profile />;

const menuItems = [
  { name: "Dashboard", icon: Home, component: Dashboard },
  { name: "Reports", icon: ReceiptText, component: Reports },
  { name: "Advisory", icon: TrendingUp, component: Advisory },
  { name: "Credit Cards", icon: CreditCard, component: CreditCards },
  { name: "Accounts", icon: UserCircle, component: Accounts },
];

interface SidebarProps {
  className?: string;
}

const Sidebar = ({}: SidebarProps) => {
  const [textCollapsed, setTextCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [isMobileView, setIsMobileView] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check for mobile view on component mount and window resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setTextCollapsed(true);
      }
    };

    // Initial check
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const toggleSidebarText = () => {
    setTextCollapsed(!textCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle menu item click - for mobile, close the menu after selection
  const handleMenuItemClick = (itemName: React.SetStateAction<string>) => {
    setActiveComponent(itemName);
    if (isMobileView) {
      setMobileMenuOpen(false);
    }
  };

  // Render the active component
  const ActiveComponent =
    menuItems.find((item) => item.name === activeComponent)?.component ||
    Dashboard;

  return (
    <div className="flex h-screen flex-col md:flex-row ">
      {/* Mobile header with menu button */}
      <div className="md:hidden flex items-center justify-between p-4 border-b ">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Sidebar for both mobile and desktop */}
      <div
        className={cn(
          "transition-all duration-300 z-20",
          // Mobile styles
          isMobileView
            ? cn(
                "fixed inset-y-0 left-0 w-64 shadow-lg z-50 transform",
                mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              )
            : // Desktop styles
              "h-screen w-auto min-w-16 border-r border-gray-200 flex flex-col relative"
        )}
      >
        {/* Desktop collapse button - hide on mobile */}
        {!isMobileView && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-3 top-24 h-6 w-6 rounded-full border bg-white text-black shadow-md z-10 hidden md:flex"
            onClick={toggleSidebarText}
            aria-label={textCollapsed ? "Show text" : "Hide text"}
          >
            {textCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}

        <div className="py-10 flex-grow">
          <nav className="space-y- px-2">
            <TooltipProvider delayDuration={300}>
              {menuItems.map((item) => {
                const isActive = activeComponent === item.name;
                const Icon = item.icon;

                return (
                  <Tooltip key={item.name} delayDuration={300}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleMenuItemClick(item.name)}
                        className={cn(
                          "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors w-full text-left",
                          isActive
                            ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 pl-3"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-5 w-5 flex-shrink-0",
                            textCollapsed && !isMobileView ? "mr-0" : "mr-3",
                            isActive ? "text-blue-600" : "text-gray-400"
                          )}
                        />
                        {(!textCollapsed || isMobileView) && (
                          <span className="transition-opacity duration-300 whitespace-nowrap">
                            {item.name}
                          </span>
                        )}
                      </button>
                    </TooltipTrigger>
                    {textCollapsed && !isMobileView && (
                      <TooltipContent side="right">{item.name}</TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </nav>
        </div>
      </div>

      {/* Mobile overlay backdrop */}
      {isMobileView && mobileMenuOpen && (
        <div
          className="fixed inset-0  backdrop-blur-lg z-10"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Content area for the active component */}
      <main className="flex-1 overflow-auto ">
        <div className="p-6">
          {" "}
          <ActiveComponent />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Sidebar;
