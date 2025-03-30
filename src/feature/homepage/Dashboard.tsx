import React, { useState } from "react";
import { financialData } from "@/constansts/data";
import FileUploader from "@/components/FileUploader";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={`rounded-xl shadow-md overflow-hidden transition-all duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 ${className}`}
  >
    {children}
  </div>
);

interface DashboardProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  setActivePage: (page: string) => void;
}

// Define transaction interface to match the actual data structure
interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
}

// Define bill interface for upcoming bills
interface Bill {
  description: string;
  amount: number;
  dueDate: string;
  status: string;
}

const Dashboard = ({
  darkMode,
  setDarkMode,
  setActivePage,
}: DashboardProps) => {
  const [showUploader, setShowUploader] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const upcomingBills: Bill[] = [
    {
      description: "Electricity Bill",
      amount: 120,
      dueDate: "April 15",
      status: "Pending",
    },
    {
      description: "Internet Service",
      amount: 80,
      dueDate: "April 20",
      status: "Paid",
    },
    {
      description: "Rent Payment",
      amount: 850,
      dueDate: "April 30",
      status: "Upcoming",
    },
  ];

  const handleUploadSuccess = () => {
    // Set a small delay to simulate data processing
    setTimeout(() => {
      setShowUploader(false);
      setIsDataLoaded(true);
    }, 1000);
  };

  // Function to toggle back to uploader view
  const handleUploadNewFile = () => {
    setShowUploader(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <div className="hidden md:flex items-center space-x-4">
          {isDataLoaded && (
            <button
              onClick={handleUploadNewFile}
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Upload New File
            </button>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700"
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
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

      {/* Always show FileUploader, but pass showDashboard prop when data is loaded */}
      <div className={isDataLoaded && !showUploader ? "mb-8" : ""}>
        <FileUploader
          onUploadSuccess={handleUploadSuccess}
          endpoint="https://e5ed-102-208-89-6.ngrok-free.app/api/v1/convert-excel-to-json"
          showDashboard={isDataLoaded && !showUploader}
        />
      </div>

      {/* Show dashboard content when data is loaded and not in uploader mode */}
      {isDataLoaded && !showUploader && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-5 border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400">
                  Revenue
                </h3>
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/20">
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
                GH¢{financialData.totalRevenue.toLocaleString()}
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
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-900/20">
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
                GH¢{financialData.totalExpenses.toLocaleString()}
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
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/20">
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
                GH¢{financialData.profit.toLocaleString()}
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
              <select className="text-sm rounded-lg border px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <option>Last 12 Months</option>
                <option>Last 6 Months</option>
                <option>Last Quarter</option>
              </select>
            </div>
            <div className="h-64 bg-opacity-10 rounded flex items-center justify-center bg-gray-100 dark:bg-gray-700">
              <div className="w-full px-5">
                {/* Chart would go here */}
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-500 dark:text-gray-400">
                    Financial chart visualization
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-5 border">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Recent Transactions
              </h3>
              <div className="space-y-3">
                {financialData.recentTransactions.map(
                  (transaction: Transaction, index) => {
                    const transactionType =
                      transaction.amount > 0 ? "income" : "expense";

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                      >
                        <div className="flex items-center">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              transactionType === "income"
                                ? "bg-green-100 dark:bg-green-900/20 text-green-500"
                                : "bg-red-100 dark:bg-red-900/20 text-red-500"
                            }`}
                          >
                            {transactionType === "income" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {transaction.description}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {transaction.date}
                            </p>
                          </div>
                        </div>
                        <p
                          className={`text-sm font-semibold ${
                            transactionType === "income"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {transactionType === "income" ? "+" : "-"}GH¢
                          {Math.abs(transaction.amount).toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
              <button className="mt-3 text-sm text-blue-600 dark:text-blue-500 hover:underline">
                View all transactions
              </button>
            </Card>

            <Card className="p-5 border">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Upcoming Bills
              </h3>
              <div className="space-y-3">
                {upcomingBills.map((bill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-500 dark:text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {bill.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Due {bill.dueDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        GH¢{bill.amount.toLocaleString()}
                      </p>
                      <p
                        className={`text-xs ${
                          bill.status === "Paid"
                            ? "text-green-500"
                            : bill.status === "Pending"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {bill.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-3 text-sm text-blue-600 dark:text-blue-500 hover:underline">
                View all bills
              </button>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
