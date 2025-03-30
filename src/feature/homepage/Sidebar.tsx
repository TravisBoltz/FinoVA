import React from "react";
import {
  Home,
  CreditCard,
  BarChart2,
  FileText,
  User,
  LogOut,
  DollarSign,
  X,
  Moon,
  Sun,
} from "lucide-react";

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  activePage: string;
  setActivePage: (page: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function Sidebar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  activePage,
  setActivePage,
  isLoggedIn,
  setIsLoggedIn,
  darkMode,
  setDarkMode,
}: SidebarProps) {
  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { id: "reporting", label: "Reports", icon: <BarChart2 size={20} /> },
    { id: "advisory", label: "Advisory", icon: <FileText size={20} /> },
    { id: "credit", label: "Credit", icon: <CreditCard size={20} /> },
  ];

  return (
    <div
      className={`h-screen ${
        isMobileMenuOpen ? "block" : "hidden"
      } md:block fixed md:relative z-30 md:z-auto transition-all duration-300 shadow-lg md:shadow-none bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-[250px]`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center text-blue-800 dark:text-blue-500">
          <DollarSign className="w-6 h-6 mr-2" />
          FinoVa
        </h2>
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4">
        <div className="overflow-hidden rounded-lg mb-6 bg-blue-800 dark:bg-blue-600">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-white rounded-full p-2">
                <DollarSign className="h-6 w-6 text-blue-800 dark:text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-white">
                  Total Balance
                </h3>
                <div className="mt-1 text-xl font-semibold text-white">-- </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="px-4 pb-4">
        <div className="text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500 dark:text-gray-400">
          Main
        </div>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`w-full flex items-center text-left py-2 px-3 rounded-lg transition-colors duration-150 ${
                  activePage === item.id
                    ? `font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-500`
                    : `hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100`
                }`}
                onClick={() => {
                  setActivePage(item.id);
                  if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                }}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="text-xs font-semibold uppercase tracking-wider mt-6 mb-2 text-gray-500 dark:text-gray-400">
          Account
        </div>
        <ul className="space-y-1">
          <li>
            <button
              className={`w-full flex items-center text-left py-2 px-3 rounded-lg transition-colors duration-150 ${
                activePage === "profile"
                  ? `font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-500`
                  : `hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100`
              }`}
              onClick={() => {
                setActivePage("profile");
                if (isMobileMenuOpen) setIsMobileMenuOpen(false);
              }}
            >
              <span className="mr-3">
                <User size={20} />
              </span>
              Profile
            </button>
          </li>
          <li>
            <button
              className="w-full flex items-center text-left py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-150"
              onClick={() => setDarkMode(!darkMode)}
            >
              <span className="mr-3">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </span>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
          <li>
            <button
              className="w-full flex items-center text-left py-2 px-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
              onClick={() => {
                console.log(`Current login status: ${isLoggedIn}`);
                setIsLoggedIn(false);
              }}
            >
              <span className="mr-3">
                <LogOut size={20} />
              </span>
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
