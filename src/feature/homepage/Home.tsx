import React, { useState, useEffect } from "react";
import Reporting from "./Reporting";
import Profile from "./Profile";
import CreditScore from "./CreditScore";
import Advisory from "./Advisory";
import { financialData } from "@/constansts/data";
import {
  BarChart,
  CreditCard,
  LogOut,
  Menu,
  Moon,
  Sun,
  User,
  LineChart,
  ShieldAlert,
  ClipboardList,
} from "lucide-react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const Home = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticatedQ
    const checkAuth = () => {
      // Check for authentication token in localStorage
      const token = localStorage.getItem("auth_token");

      if (token) {
        setIsLoggedIn(true);
      } else {
        // Redirect to auth page if not logged in
        navigate("/register");
      }
      setIsAuthChecking(false);
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // If still checking auth status, show loading
  if (isAuthChecking) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Verifying authentication...
          </p>
        </div>
      </div>
    );
  }
 
  // If not logged in, don't render the page (router will redirect)
  if (!isLoggedIn) {
    return null;
  }

  const icons = {
    dashboard: ClipboardList,
    reporting: BarChart,
    advisory: ShieldAlert,
    credit: CreditCard,
    profile: User,
    logout: LogOut,
    chart: LineChart,
    moon: Moon,
    sun: Sun,
    menu: Menu,
  };

  const Icon = ({ name, size = 20, className = "" }) => {
    const LucideIcon = icons[name];
    return LucideIcon ? <LucideIcon size={size} className={className} /> : null;
  };

  const Header = () => (
    <header className="md:hidden sticky top-0 z-20 px-4 py-3 flex items-center justify-between shadow-sm bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <button onClick={() => setIsMobileMenuOpen(true)} className="mr-3">
          <Icon name="menu" />
        </button>
        <h1 className="text-lg font-bold text-blue-800 dark:text-blue-500">
          FinoVa
        </h1>
      </div>
      <div className="flex items-center space-x-3">
        <button
          className="p-1 rounded-full hover:bg-opacity-10 bg-gray-100 dark:bg-gray-700"
          onClick={() => setDarkMode(!darkMode)}
        >
          <Icon name={darkMode ? "sun" : "moon"} />
        </button>
      </div>
    </header>
  );

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex h-full">
        <Sidebar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          activePage={activePage}
          setActivePage={setActivePage}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div
          className="flex-1 flex flex-col overflow-hidden md:ml-0 transition-all duration-300 ease-in-out"
          style={{ marginLeft: isMobileMenuOpen ? "250px" : "0" }}
        >
          <Header />

          <main className="flex-1 overflow-auto">
            {activePage === "dashboard" && (
              <Dashboard 
                darkMode={darkMode} 
                setDarkMode={setDarkMode} 
                setActivePage={setActivePage} 
              />
            )}
            {activePage === "reporting" && <Reporting />}
            {activePage === "advisory" && <Advisory />}
            {activePage === "credit" && <CreditScore />}
            {activePage === "profile" && <Profile />}
          </main>
        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Home;
