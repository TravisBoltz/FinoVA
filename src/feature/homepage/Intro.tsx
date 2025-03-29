import React, { useState, useEffect, ReactNode } from "react";
// Fix the import path to use lowercase for consistency
import { Icon } from "@/components/ui/icon";

// Import Card components correctly with lowercase path to match other imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";

// Define theme colors
const lightThemeColors = {
  primary: "#3b82f6",
  secondary: "#6366f1",
  success: "#10b981",
  danger: "#ef4444",
  warning: "#f59e0b",
  info: "#06b6d4",
  text: {
    primary: "#1f2937",
    secondary: "#4b5563",
    muted: "#6b7280",
  },
  background: "#ffffff",
  card: "#ffffff",
  border: "#e5e7eb",
};

const darkThemeColors = {
  primary: "#3b82f6",
  secondary: "#6366f1",
  success: "#10b981",
  danger: "#ef4444",
  warning: "#f59e0b",
  info: "#06b6d4",
  text: {
    primary: "#f3f4f6",
    secondary: "#e5e7eb",
    muted: "#9ca3af",
  },
  background: "#111827",
  card: "#1f2937",
  border: "#374151",
};

// Define TypeScript interfaces
interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
}

interface Notification {
  id: string;
  text: string;
  type: "report" | "advisory" | "credit" | "other";
}

interface MonthlyData {
  months: string[];
  income: number[];
  expenses: number[];
}

interface FinancialData {
  totalRevenue: number;
  totalExpenses: number;
  profit: number;
  monthlyData: MonthlyData;
  recentTransactions: Transaction[];
  notifications: Notification[];
}

// Sample financial data
const sampleFinancialData: FinancialData = {
  totalRevenue: 48250,
  totalExpenses: 21300,
  profit: 26950,
  monthlyData: {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    income: [15000, 18000, 21000, 24000, 27000, 30000],
    expenses: [8000, 9000, 10000, 11000, 12000, 13000],
  },
  recentTransactions: [
    { id: "1", description: "Client Payment", amount: 1250, date: "Today" },
    {
      id: "2",
      description: "Software Subscription",
      amount: -99,
      date: "Yesterday",
    },
    { id: "3", description: "Tax Return", amount: 850, date: "2 days ago" },
    {
      id: "4",
      description: "Office Supplies",
      amount: -120,
      date: "3 days ago",
    },
  ],
  notifications: [
    {
      id: "1",
      text: "Your monthly financial report is ready to view",
      type: "report",
    },
    {
      id: "2",
      text: "New financial advisory available for your business",
      type: "advisory",
    },
    {
      id: "3",
      text: "Your credit score has improved by 15 points",
      type: "credit",
    },
    { id: "4", text: "New tax saving opportunity identified", type: "other" },
  ],
};

export default function Intro() {
  // State management
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("dashboard");
  const [timeRange, setTimeRange] = useState<string>("12months");
  const [financialData, setFinancialData] =
    useState<FinancialData>(sampleFinancialData);

  // Determine which color theme to use based on dark mode state
  const colors = darkMode ? darkThemeColors : lightThemeColors;

  // Effect to handle system color scheme changes
  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDarkMode);

    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Function to handle page navigation
  const handlePageChange = (page: string) => {
    setActivePage(page);
    // Here you would typically use a router to navigate
    // For example: router.push(`/${page}`);
  };

  // Function to handle time range changes
  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value);
    // In a real app, you would fetch new data based on the selected time range
  };

  // Function to mark all notifications as read
  const markAllNotificationsAsRead = () => {
    // In a real app, you would update the notification status in your database
    console.log("Marking all notifications as read");
  };

  return (
    <div className={` space-y-6`}>
      {/* Performance snapshot with improved visualization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 border transition-transform duration-200 hover:shadow-lg transform hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <h3
                className="text-sm uppercase font-semibold"
                style={{ color: colors.text.muted }}
              >
                Revenue
              </h3>
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: darkMode
                    ? "rgba(59, 130, 246, 0.2)"
                    : "rgba(59, 130, 246, 0.1)",
                  color: colors.primary,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold" style={{ color: colors.primary }}>
              ${financialData.totalRevenue.toLocaleString()}
            </p>
            <div className="mt-2 flex items-center">
              <span className="text-xs font-medium text-green-500 bg-opacity-50 rounded-full px-2 py-0.5">
                +8.2%
              </span>
              <span
                className="ml-2 text-xs"
                style={{ color: colors.text.muted }}
              >
                vs. last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="p-5 border transition-transform duration-200 hover:shadow-lg transform hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <h3
                className="text-sm uppercase font-semibold"
                style={{ color: colors.text.muted }}
              >
                Expenses
              </h3>
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: darkMode
                    ? "rgba(239, 68, 68, 0.2)"
                    : "rgba(239, 68, 68, 0.1)",
                  color: colors.danger,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold" style={{ color: colors.danger }}>
              ${financialData.totalExpenses.toLocaleString()}
            </p>
            <div className="mt-2 flex items-center">
              <span className="text-xs font-medium text-red-500 bg-red-100 bg-opacity-50 rounded-full px-2 py-0.5">
                +4.1%
              </span>
              <span
                className="ml-2 text-xs"
                style={{ color: colors.text.muted }}
              >
                vs. last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="p-5 border transition-transform duration-200 hover:shadow-lg transform hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <h3
                className="text-sm uppercase font-semibold"
                style={{ color: colors.text.muted }}
              >
                Net Profit
              </h3>
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: darkMode
                    ? "rgba(16, 185, 129, 0.2)"
                    : "rgba(16, 185, 129, 0.1)",
                  color: colors.success,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold" style={{ color: colors.success }}>
              ${financialData.profit.toLocaleString()}
            </p>
            <div className="mt-2 flex items-center">
              <span className="text-xs font-medium text-green-500 bg-green-100 bg-opacity-50 rounded-full px-2 py-0.5">
                +12.5%
              </span>
              <span
                className="ml-2 text-xs"
                style={{ color: colors.text.muted }}
              >
                vs. last month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance chart */}
      <Card className="border">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2
              className="text-lg font-semibold"
            >
              Financial Overview
            </h2>
            <select
              className="text-sm rounded-lg border px-3 py-1"
            
              value={timeRange}
              onChange={handleTimeRangeChange}
            >
              <option value="12months">Last 12 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="quarter">Last Quarter</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="h-64 bg-opacity-10 rounded flex items-center justify-center"
            
          >
            {/* Placeholder for actual chart component */}
            <div className="w-full px-5">
              <div className="relative h-56">
                {/* Revenue area */}
                <div className="absolute bottom-0 left-0 right-0 bg-blue-500 bg-opacity-20 h-48 rounded-md"></div>

                {/* Expense area */}
                <div className="absolute bottom-0 left-0 right-0 bg-red-500 bg-opacity-20 h-32 rounded-md"></div>

                {/* Revenue line */}
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
                            backgroundColor: colors.primary,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expense line */}
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
                            backgroundColor: colors.danger,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Month labels */}
                <div
                  className="absolute bottom-0 left-0 right-0 flex justify-between pt-2 text-xs"
                  style={{ color: colors.text.muted }}
                >
                  {financialData.monthlyData.months.map((month, index) => (
                    <span key={index}>{month}</span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center">
                  <span
                    className="h-3 w-3 rounded-full mr-2"
                    style={{ backgroundColor: colors.primary }}
                  ></span>
                  <span
                    className="text-sm"
                    style={{ color: colors.text.primary }}
                  >
                    Revenue
                  </span>
                </div>
                <div className="flex items-center">
                  <span
                    className="h-3 w-3 rounded-full mr-2"
                    style={{ backgroundColor: colors.danger }}
                  ></span>
                  <span
                    className="text-sm"
                    style={{ color: colors.text.primary }}
                  >
                    Expenses
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick links & recent transactions in side-by-side layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick actions */}
        <Card className="border">
          <CardHeader>
            <h2
              className="text-lg font-semibold"
            >
              Quick Actions
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  name: "Generate Report",
                  icon: "reporting",
                  page: "reporting",
                },
                { name: "Get Advice", icon: "advisory", page: "advisory" },
                { name: "Check Credit", icon: "credit", page: "credit" },
                { name: "Learn More", icon: "education", page: "education" },
              ].map((action, index) => (
                <button
                  key={index}
                  className="p-3 rounded-xl flex flex-col items-center justify-center transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: darkMode
                      ? "rgba(59, 130, 246, 0.1)"
                      : "rgba(59, 130, 246, 0.05)",
                    color: colors.primary,
                  }}
                  onClick={() => handlePageChange(action.page)}
                >
                  <span
                    className="p-2 rounded-full mb-2"
                    style={{
                      backgroundColor: darkMode
                        ? "rgba(59, 130, 246, 0.2)"
                        : "rgba(59, 130, 246, 0.1)",
                    }}
                  >
                    <Icon name={action.icon as any} />
                  </span>
                  <span className="text-sm font-medium">{action.name}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent transactions */}
        <Card className="border">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2
                className="text-lg font-semibold"
              >
                Recent Transactions
              </h2>
              <button
                className="text-sm font-medium"
                style={{ color: colors.primary }}
              >
                View All
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 overflow-hidden">
              {financialData.recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-3 rounded-lg flex items-center justify-between transition-colors duration-150"
                  style={{
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.02)",
                  }}
                >
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{
                        backgroundColor:
                          transaction.amount > 0
                            ? darkMode
                              ? "rgba(16, 185, 129, 0.2)"
                              : "rgba(16, 185, 129, 0.1)"
                            : darkMode
                            ? "rgba(239, 68, 68, 0.2)"
                            : "rgba(239, 68, 68, 0.1)",
                        color:
                          transaction.amount > 0
                            ? colors.success
                            : colors.danger,
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
                            d="M10 5a1 1 0 10-2 0v3a1 1 0 102 0V5a1 1 0 10-2 0v3a1 1 0 102 0V5z"
                            clipRule="evenodd"
                          />
                        )}
                      </svg>
                    </div>
                    <div>
                      <p
                        className="font-medium"
                        style={{ color: colors.text.primary }}
                      >
                        {transaction.description}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: colors.text.muted }}
                      >
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`font-medium ${
                      transaction.amount > 0 ? "text-green-500" : "text-red-500"
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
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card className="border">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2
              className="text-lg font-semibold"
              style={{ color: colors.text.primary }}
            >
              Recent Notifications
            </h2>
            <button
              onClick={markAllNotificationsAsRead}
              className="text-sm font-medium rounded-full py-1 px-3"
              style={{
                backgroundColor: darkMode
                  ? "rgba(59, 130, 246, 0.2)"
                  : "rgba(59, 130, 246, 0.1)",
                color: colors.primary,
              }}
            >
              Mark all as read
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {financialData.notifications.map((notification) => {
              const getNotificationStyle = () => {
                switch (notification.type) {
                  case "report":
                    return {
                      borderColor: colors.primary,
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
                      borderColor: colors.warning,
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 10-2 0v6a1 1 0 102 0V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ),
                    };
                  case "credit":
                    return {
                      borderColor: colors.success,
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812a3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ),
                    };
                  default:
                    return {
                      borderColor: colors.info,
                      icon: null,
                    };
                }
              };

              const { borderColor, icon } = getNotificationStyle();

              return (
                <div
                  key={notification.id}
                  className="p-4 border-l-4 rounded-r-md flex items-start transition-transform duration-200 hover:scale-[1.01]"
                  style={{
                    borderColor,
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.02)",
                  }}
                >
                  <div className="mr-3" style={{ color: borderColor }}>
                    {icon}
                  </div>
                  <div>
                    <p style={{ color: colors.text.primary }}>
                      {notification.text}
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: colors.text.muted }}
                    >
                      2 hours ago
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
