import React, { useState, useEffect } from "react";
import Reporting from "./Reporting";
import Profile from "./Profile";
import CreditScore from "./CreditScore";
import Advisory from "./Advisory";
import { financialData } from "@/constansts/data";
import {
  BarChart,
  Bell,
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

const Home = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const icons = {
    dashboard: ClipboardList,
    reporting: BarChart,
    advisory: ShieldAlert,
    credit: CreditCard,
    profile: User,
    logout: LogOut,
    chart: LineChart,
    bell: Bell,
    moon: Moon,
    sun: Sun,
    menu: Menu,
  };

  const Icon = ({ name, size = 20, className = "" }) => {
    const LucideIcon = icons[name];
    return LucideIcon ? <LucideIcon size={size} className={className} /> : null;
  };

  const Card = ({ children, className = "" }) => (
    <div
      className={`rounded-xl shadow-md overflow-hidden transition-all duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 ${className}`}
    >
      {children}
    </div>
  );

  const Header = () => (
    <header
      className="md:hidden sticky top-0 z-20 px-4 py-3 flex items-center justify-between shadow-sm bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
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
          className="relative p-1 rounded-full hover:bg-opacity-10 bg-gray-100 dark:bg-gray-700"
        >
          <Icon name="bell" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/4 -translate-y-1/4"></span>
        </button>
        <button
          className="p-1 rounded-full hover:bg-opacity-10 bg-gray-100 dark:bg-gray-700"
          onClick={() => setDarkMode(!darkMode)}
        >
          <Icon name={darkMode ? "sun" : "moon"} />
        </button>
      </div>
    </header>
  );

  const Dashboard = () => (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <button
              className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700"
            >
              <Icon name="bell" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/4 -translate-y-1/4"></span>
            </button>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700"
          >
            <Icon name={darkMode ? "sun" : "moon"} />
          </button>
          <button
            onClick={() => setActivePage("profile")}
            className="flex items-center"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
              A
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400">
              Revenue
            </h3>
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-blue-800 dark:text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-500">
            ${financialData.totalRevenue.toLocaleString()}
          </p>
          <div className="mt-2 flex items-center">
            <span className="text-xs font-medium text-green-500 bg-green-100 bg-opacity-50 rounded-full px-2 py-0.5">
              +8.2%
            </span>
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              vs. last month
            </span>
          </div>
        </Card>

        <Card className="p-5 border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400">
              Expenses
            </h3>
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-900/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-red-500 dark:text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-red-500 dark:text-red-600">
            ${financialData.totalExpenses.toLocaleString()}
          </p>
          <div className="mt-2 flex items-center">
            <span className="text-xs font-medium text-red-500 bg-red-100 bg-opacity-50 rounded-full px-2 py-0.5">
              +4.1%
            </span>
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              vs. last month
            </span>
          </div>
        </Card>

        <Card className="p-5 border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400">
              Net Profit
            </h3>
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-green-500 dark:text-green-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-green-500 dark:text-green-600">
            ${financialData.profit.toLocaleString()}
          </p>
          <div className="mt-2 flex items-center">
            <span className="text-xs font-medium text-green-500 bg-green-100 bg-opacity-50 rounded-full px-2 py-0.5">
              +12.5%
            </span>
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              vs. last month
            </span>
          </div>
        </Card>
      </div>

      <Card className="p-5 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Financial Overview
          </h2>
          <select
            className="text-sm rounded-lg border px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option>Last 12 Months</option>
            <option>Last 6 Months</option>
            <option>Last Quarter</option>
          </select>
        </div>
        <div
          className="h-64 bg-opacity-10 rounded flex items-center justify-center bg-gray-100 dark:bg-gray-700"
        >
          <div className="w-full px-5">
            <div className="relative h-56">
              <div className="absolute bottom-0 left-0 right-0 bg-blue-500 bg-opacity-20 h-48 rounded-md"></div>

              <div className="absolute bottom-0 left-0 right-0 bg-red-500 bg-opacity-20 h-32 rounded-md"></div>

              <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end">
                <div className="w-full flex items-end justify-between">
                  {financialData.monthlyData.income.map((value, index) => (
                    <div
                      key={index}
                      className="h-full flex flex-col items-center justify-end"
                    >
                      <div
                        className="w-1 bg-blue-500 rounded-t transition-all duration-500"
                        style={{
                          height: `${(value / 30000) * 100}%`,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end">
                <div className="w-full flex items-end justify-between">
                  {financialData.monthlyData.expenses.map((value, index) => (
                    <div
                      key={index}
                      className="h-full flex flex-col items-center justify-end"
                    >
                      <div
                        className="w-1 bg-red-500 rounded-t transition-all duration-500"
                        style={{
                          height: `${(value / 30000) * 100}%`,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 flex justify-between pt-2 text-xs text-gray-500 dark:text-gray-400"
              >
                {financialData.monthlyData.months.map((month, index) => (
                  <span key={index}>{month}</span>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <span
                  className="h-3 w-3 rounded-full mr-2 bg-blue-500"
                ></span>
                <span className="text-sm text-gray-900 dark:text-gray-100">
                  Revenue
                </span>
              </div>
              <div className="flex items-center">
                <span
                  className="h-3 w-3 rounded-full mr-2 bg-red-500"
                ></span>
                <span className="text-sm text-gray-900 dark:text-gray-100">
                  Expenses
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5 border">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: "Generate Report", icon: "reporting", page: "reporting" },
              { name: "Get Advice", icon: "advisory", page: "advisory" },
              { name: "Check Credit", icon: "credit", page: "credit" },
              { name: "Learn More", icon: "education", page: "education" },
            ].map((action, index) => (
              <button
                key={index}
                className="p-3 rounded-xl flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-500"
                onClick={() => setActivePage(action.page)}
              >
                <span
                  className="p-2 rounded-full mb-2 bg-blue-100 dark:bg-blue-900/20"
                >
                  <Icon name={action.icon} />
                </span>
                <span className="text-sm font-medium">{action.name}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5 border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Recent Transactions
            </h2>
            <button
              className="text-sm font-medium text-blue-800 dark:text-blue-500"
            >
              View All
            </button>
          </div>
          <div className="space-y-3 overflow-hidden">
            {financialData.recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-3 rounded-lg flex items-center justify-between transition-colors duration-150 bg-gray-100 dark:bg-gray-700"
              >
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                    style={{
                      backgroundColor:
                        transaction.amount > 0
                          ? "bg-green-100 dark:bg-green-900/20"
                          : "bg-red-100 dark:bg-red-900/20",
                      color:
                        transaction.amount > 0
                          ? "text-green-500 dark:text-green-600"
                          : "text-red-500 dark:text-red-600",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      {transaction.amount > 0 ? (
                        <path
                          fillRule="evenodd"
                          d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      ) : (
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 00-1 1v3h3a1 1 0 001 1v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      )}
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {transaction.date}
                    </p>
                  </div>
                </div>
                <div
                  className={`font-medium ${
                    transaction.amount > 0
                      ? "text-green-500 dark:text-green-600"
                      : "text-red-500 dark:text-red-600"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recent Notifications
          </h2>
          <button
            className="text-sm font-medium rounded-full py-1 px-3 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-500"
          >
            Mark all as read
          </button>
        </div>
        <div className="space-y-3">
          {financialData.notifications.map((notification) => {
            const getNotificationStyle = () => {
              switch (notification.type) {
                case "report":
                  return {
                    borderColor: "border-blue-500 dark:border-blue-600",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v6a1 1 0 102 0V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ),
                  };
                case "advisory":
                  return {
                    borderColor: "border-yellow-500 dark:border-yellow-600",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 10-2 0v3a1 1 0 100 2h-3a1 1 0 100 2h3a1 1 0 010-2v-3a1 1 0 00-1-1H7a1 1 0 00-1 1v3a1 1 0 001 1h3v-3a1 1 0 011-1 1 1 0 011 1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ),
                  };
                case "credit":
                  return {
                    borderColor: "border-green-500 dark:border-green-600",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ),
                  };
                default:
                  return {
                    borderColor: "border-gray-500 dark:border-gray-600",
                    icon: null,
                  };
              }
            };

            const { borderColor, icon } = getNotificationStyle();

            return (
              <div
                key={notification.id}
                className={`p-4 border-l-4 rounded-r-md flex items-start transition-transform duration-200 hover:scale-[1.01] ${borderColor}`}
              >
                <div className="mr-3" style={{ color: borderColor }}>
                  {icon}
                </div>
                <div>
                  <p className="text-gray-900 dark:text-gray-100">
                    {notification.text}
                  </p>
                  <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
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
            {activePage === "dashboard" && <Dashboard />}
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
